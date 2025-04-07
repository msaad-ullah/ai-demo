import {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Voice from '@react-native-voice/voice';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';

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
      setMessages(prev => [...prev, {role: 'user', content: results[0]}]);
      await onSpeechEndRequest([
        ...messages,
        {role: 'user', content: results[0]},
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  const playAudioFromBase64 = async (base64Audio: string) => {
    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/audio.wav`;
      await RNFS.writeFile(filePath, base64Audio, 'base64');

      const sound = new Sound(filePath, '', error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        sound.play(success => {
          if (success) {
            console.log('Successfully played');
          } else {
            console.log('Playback failed');
          }
          sound.release();
        });
      });
    } catch (e) {
      console.error('Error playing audio:', e);
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
    try {
      setLoading(true);
      const response = await apiClient.post('/chat/completions', {
        model: 'gpt-4o-audio-preview',
        modalities: ['text', 'audio'],
        audio: {voice: 'alloy', format: 'wav'},
        messages: messagesList,
        store: true,
      });

      if (response) {
        console.log(response.data);
        await playAudioFromBase64(
          response.data.choices[0]?.message?.audio?.data,
        );
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: response.data.choices[0]?.message?.audio?.transcript,
          },
        ]);
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
      console.log('onSpeechStart: ', e);
    };

    Voice.onSpeechRecognized = e => {
      console.log('onSpeechRecognized: ', e);
    };

    Voice.onSpeechEnd = e => {
      console.log('onSpeechEnd: ', e);
    };

    Voice.onSpeechError = e => {
      console.log('onSpeechError: ', e);
      setError(JSON.stringify(e.error));
    };

    Voice.onSpeechResults = e => {
      console.log('onSpeechResults: ', e);
      if (e.value) {
        setResults(e.value);
      }
    };

    Voice.onSpeechPartialResults = e => {
      console.log('onSpeechPartialResults: ', e);
      if (e.value) setPartialResults(e.value);
    };

    Voice.onSpeechVolumeChanged = e => {
      console.log('onSpeechVolumeChanged: ', e);
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
