import {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Voice from '@react-native-voice/voice';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import TrackPlayer from 'react-native-track-player';
import {encode} from 'base64-arraybuffer';

import {RadialImage, Text, View, SpeakButton} from '../components';
import {useTheme} from '../hooks';
import {
  getMicrophonePermission,
  getSpeechRecognitionPermission,
} from '../services/permissions';
import apiClient from '../services/axios';

type Message = {
  role: string;
  content: string;
};

Sound.setCategory('Playback');

export default function Home() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [partialResults, setPartialResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setIsListening(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error(e);
    }
  };

  const playAudioFromBase64 = async (base64Audio: string): Promise<void> => {
    const path = `${RNFS.DocumentDirectoryPath}/${Date.now()}-audio.mp3`;

    try {
      console.log('path', path);
      console.log('base64', base64Audio?.slice(0, 100));
      // Write base64 to a file
      await RNFS.writeFile(path, base64Audio, 'base64');

      // Reset TrackPlayer before playing
      await TrackPlayer.reset();

      // Add and play the track
      await TrackPlayer.add({
        id: 'chat-audio',
        url: `file://${path}`,
        title: 'Chat Response',
        artist: 'OpenAI',
      });

      await TrackPlayer.play();
    } catch (error) {
      console.error('Error playing audio from base64:', error);
    }
  };

  const cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    resetStates();
  };

  const onSpeechEndRequest = async (messagesList: Message[]) => {
    console.log('messages list', messagesList);
    try {
      setLoading(true);
      const response = await apiClient.post('/chat/completions', {
        model: 'gpt-4o',
        messages: messagesList,
      });

      if (response.data) {
        console.log(
          'response.data',
          response.data.choices[0]?.message?.content,
        );
        // await playAudioFromBase64(
        //   response.data.choices[0]?.message?.audio?.data,
        // );
        if (response.data.choices[0]?.message?.content) {
          const audioResponse = await apiClient.post(
            '/audio/speech',
            {
              input: response.data.choices[0]?.message?.content,
              model: 'tts-1-hd',
              voice: 'alloy',
              response_format: 'mp3',
            },
            {
              responseType: 'arraybuffer',
            },
          );
          console.log('audires', audioResponse);
          const base64Audio = encode(audioResponse.data);

          console.log('base64audio', base64Audio);
          await playAudioFromBase64(base64Audio);
          setMessages(prev => [
            ...prev,
            {
              role: 'assistant',
              content: response.data.choices[0]?.message?.content,
            },
          ]);
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(JSON.stringify(err));
    }
  };

  const resetStates = () => {
    setError('');
    setResults([]);
    setPartialResults([]);
  };

  useEffect(() => {
    // requesting necessary permissions
    getMicrophonePermission();
    getSpeechRecognitionPermission();
  }, []);

  useEffect(() => {
    Voice.onSpeechStart = e => {
      // console.log('onSpeechStart: ', e);
    };

    Voice.onSpeechRecognized = e => {
      // console.log('onSpeechRecognized: ', e);
    };

    Voice.onSpeechEnd = e => {
      // console.log('onSpeechEnd: ', e);
      stopRecognizing();
      setIsListening(false);
    };

    Voice.onSpeechError = e => {
      console.log('onSpeechError: ', e);
      setError(JSON.stringify(e.error));
      stopRecognizing();
      setIsListening(false);
      destroyRecognizer();
    };

    Voice.onSpeechResults = e => {
      if (e.value && e.value.length > 0) {
        setResults(e.value);
        setMessages(prev => {
          const newMessages = [...prev, {role: 'user', content: e.value[0]}];
          onSpeechEndRequest(newMessages);
          return newMessages;
        });
      }
    };

    Voice.onSpeechPartialResults = e => {
      // console.log('onSpeechPartialResults: ', e);
      if (e.value) setPartialResults(e.value);
    };

    Voice.onSpeechVolumeChanged = e => {
      // console.log('onSpeechVolumeChanged: ', e);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
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
          {isListening
            ? 'Go ahead, Im listening...'
            : 'Hey there, what can I do for you today?'}
        </Text>
        <RadialImage />
        <SpeakButton
          isListening={isListening}
          onPress={isListening ? stopRecognizing : startRecognizing}
        />
      </View>
    </View>
  );
}
