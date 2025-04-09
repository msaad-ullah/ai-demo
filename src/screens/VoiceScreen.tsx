import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  mediaDevices,
  RTCPeerConnection,
  MediaStream,
  RTCView,
  RTCSessionDescription,
  type MediaStreamTrack,
} from 'react-native-webrtc';
import {TouchableOpacity} from 'react-native';
import {useCallback, useRef, useState} from 'react';
import axios from 'axios';
import Config from 'react-native-config';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {
  GradientContainer,
  Icon,
  Loader,
  RadialImage,
  Text,
  View,
} from '../components';
import {useTheme} from '../hooks';
import {moderateScale} from '../helpers/metrics';
import Screens from '../navigation/Screens';

export default function VoiceScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [transcript, setTranscript] = useState('');
  const remoteMediaStream = useRef<MediaStream>(new MediaStream());
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localTrackRef = useRef<MediaStreamTrack | null>(null);

  async function init() {
    try {
      setLoading(true);
      const tokenResponse = await axios.get(Config.DEV_SERVER_URL + '/session');
      const ephimerialKey = tokenResponse.data.client_secret.value;

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      //@ts-ignore
      pc.addEventListener('connectionstatechange', (e: any) => {
        console.log('connectionstatechange', e);
      });

      //@ts-ignore
      pc.ontrack = (event: any) =>
        remoteMediaStream.current.addTrack(event.streams[0]);

      const ms = await mediaDevices.getUserMedia({audio: true});
      const track = ms.getTracks()[0];
      localTrackRef.current = track;
      pc.addTrack(track);

      const dc = pc.createDataChannel('oai-events');

      //@ts-ignore
      dc.addEventListener('message', async (e: any) => {
        const data = JSON.parse(e.data);
        console.log('dataChannel message', JSON.stringify(data));
        setEvents(prev => [data, ...prev]);

        if (data.type === 'response.audio_transcript.done') {
          setTranscript(data.transcript);
        }
      });

      //@ts-ignore
      dc.addEventListener('open', () => {
        const event = {
          type: 'session.update',
          session: {
            modalities: ['text', 'audio'],
          },
        };
        dc.send(JSON.stringify(event));
      });

      const offer = await pc.createOffer({});
      await pc.setLocalDescription(offer);

      const baseUrl = 'https://api.openai.com/v1/realtime';
      const model = 'gpt-4o-realtime-preview-2024-12-17';
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: 'POST',
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephimerialKey}`,
          'Content-Type': 'application/sdp',
        },
      });

      const answer = {
        type: 'answer',
        sdp: await sdpResponse.text(),
      };

      const remoteDesc = new RTCSessionDescription(answer);
      await pc.setRemoteDescription(remoteDesc);
      setLoading(false);
    } catch (err) {
      console.log(JSON.stringify(err));
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      init();

      // Cleanup when screen unmounts
      return () => {
        console.log('clean up');
        if (localTrackRef.current) {
          localTrackRef.current.stop();
          localTrackRef.current = null;
        }

        if (pcRef.current) {
          pcRef.current.close();
          pcRef.current = null;
        }

        remoteMediaStream.current = new MediaStream(); // clear remote stream
      };
    }, []),
  );

  return loading || !localTrackRef.current ? (
    <Loader />
  ) : (
    <GradientContainer>
      <View
        flex={1}
        style={{
          paddingBottom: insets.bottom + theme.spacing.xs,
          paddingTop: insets.top + theme.spacing.xs,
          paddingHorizontal: theme.spacing.md,
        }}>
        <View
          alignItems="center"
          gap={8}
          flex={1}
          justifyContent="space-evenly">
          <Text variant="bold" size="xxl" textAlign="center">
            {transcript && transcript.length > 0
              ? transcript
              : 'Go ahead, Im listening...'}
          </Text>
          <RadialImage />
          {remoteMediaStream && remoteMediaStream.current && (
            // @ts-ignore
            <RTCView stream={remoteMediaStream.current} />
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate(Screens.ChatScreen)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
                backgroundColor: theme.colors.primary40,
                padding: theme.spacing.md,
                borderRadius: 10,
              }}>
              <Icon
                name="chatbubble-ellipses"
                vector="Ionicons"
                color={theme.colors.primary80}
                size={moderateScale(28)}
              />
              <Text size="sm" color="primary80" variant="semibold">
                Chat Instead
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </GradientContainer>
  );
}
