import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  mediaDevices,
  RTCPeerConnection,
  MediaStream,
  RTCView,
  RTCSessionDescription,
} from 'react-native-webrtc';

import {RadialImage, Text, View} from '../components';
import {useTheme} from '../hooks';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import Config from 'react-native-config';

export default function Home() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [events, setEvents] = useState<any[]>([]);
  const [transcript, setTranscript] = useState('');
  const remoteMediaStream = useRef<MediaStream>(new MediaStream());

  async function init() {
    try {
      const tokenResponse = await axios.get(Config.DEV_SERVER_URL + '/session');

      const ephimerialKey = tokenResponse.data.client_secret.value;

      const pc = new RTCPeerConnection();

      pc.addEventListener('connectionstatechange', (e: any) => {
        console.log('connectionstatechange', e);
      });

      pc.ontrack = (event: any) =>
        remoteMediaStream.current.addTrack(event.streams[0]);

      const ms = await mediaDevices.getUserMedia({audio: true});
      pc.addTrack(ms.getTracks()[0]);

      const dc = pc.createDataChannel('oai-events');
      dc.addEventListener('message', async (e: any) => {
        const data = JSON.parse(e.data);
        console.log('dataChannel message', JSON.stringify(data));
        setEvents(prev => [data, ...prev]);

        // Listen for when the model starts and stops speaking
        if (data.type === 'input_audio_buffer.speech_started') {
        }

        if (data.type === 'input_audio_buffer.speech_stopped') {
        }

        if (data.type === 'response.audio.done') {
        }

        // Get transcript
        if (data.type === 'response.audio_transcript.done') {
          setTranscript(data.transcript);
        }
      });

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
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <View
      flex={1}
      style={{
        paddingTop: insets.top + theme.spacing.md,
        paddingBottom: insets.bottom + theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
      }}>
      <View alignItems="center" gap={8} flex={1} justifyContent="space-evenly">
        <Text variant="bold" size="xxl" textAlign="center">
          Go ahead, Im listening...
        </Text>
        <RadialImage />
        {remoteMediaStream && remoteMediaStream.current && (
          <RTCView stream={remoteMediaStream.current} />
        )}
      </View>
    </View>
  );
}
