import React, {useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, TextInput, TouchableOpacity} from 'react-native';
import Voice from '@react-native-voice/voice';

import {
  GradientContainer,
  View,
  ChatScreenHeader,
  Text,
  Icon,
  TypingDotsAnimation,
} from '../components';
import {useTheme} from '../hooks';
import {FontFamily} from '../styles/theme/theme';
import {moderateScale} from '../helpers/metrics';
import apiClient from '../services/axios';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const flatListRef = useRef<FlatList>(null);

  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [partialResults, setPartialResults] = useState<string[]>([]);

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

  const resetStates = () => {
    setPartialResults([]);
  };

  const onSend = async () => {
    if (input.length < 1) return;

    setInput('');
    setMessages(prev => [...prev, {role: 'user', content: input}]);
    try {
      setLoading(true);
      const response = await apiClient.post('/chat/completions', {
        model: 'gpt-4o',
        messages: [...messages, {role: 'user', content: input}],
      });

      if (response.data) {
        console.log(response.data);
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: response.data.choices[0]?.message?.content,
          },
        ]);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I can't respond at this time. Please check your internet connection",
        },
      ]);
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd();
    }
  }, [messages.length]);

  useEffect(() => {
    Voice.onSpeechStart = e => {
      console.log('onSpeechStart: ', e);
    };

    Voice.onSpeechRecognized = e => {
      console.log('onSpeechRecognized: ', e);
    };

    Voice.onSpeechEnd = e => {
      console.log('onSpeechEnd: ', e);
      stopRecognizing();
    };

    Voice.onSpeechError = e => {
      console.log('onSpeechError: ', e);
      stopRecognizing();
      destroyRecognizer();
    };

    Voice.onSpeechResults = e => {
      console.log('onSpeechResults: ', e);
    };

    Voice.onSpeechPartialResults = e => {
      console.log('onSpeechPartialResults: ', e);
      if (e.value) {
        setPartialResults(e.value);
        setInput(e.value[0]);
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <GradientContainer>
      <View
        flex={1}
        style={{
          width: '100%',
          paddingBottom: insets.bottom + theme.spacing.md,
          paddingTop: insets.top + theme.spacing.md,
        }}
        ph="md">
        <ChatScreenHeader />
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({item, index}) => (
            <View
              key={index}
              backgroundColor={
                item.role === 'assistant' ? 'black' : 'primary80'
              }
              mv="xs"
              p="xs"
              style={{borderRadius: 10}}>
              <Text size="sm">{item.content}</Text>
              {item.role === 'assistant' && (
                <View p="xxs" alignItems="flex-end">
                  <TouchableOpacity>
                    <Icon
                      name="volume-up"
                      vector="FontAwesome5"
                      size={moderateScale(16)}
                      color={theme.colors.neutral40}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          ListFooterComponent={() => loading && <TypingDotsAnimation />}
        />

        <View
          backgroundColor="white"
          style={{borderRadius: 10}}
          flexDirection="row"
          alignItems="center"
          ph="xs">
          <TextInput
            value={input}
            onChangeText={t => setInput(t)}
            placeholder="Type your message..."
            placeholderTextColor={theme.colors.neutral90}
            style={{
              fontFamily: FontFamily.regular,
              fontSize: theme.fontSizes.xs,
              flex: 1,
              color: theme.colors.black,
            }}
          />
          <View gap={12} flexDirection="row" alignItems="center">
            <TouchableOpacity
              onPress={isListening ? stopRecognizing : startRecognizing}>
              <Icon
                name={isListening ? 'microphone-alt-slash' : 'microphone-alt'}
                vector="FontAwesome5"
                size={moderateScale(24)}
                color={theme.colors.neutral50}
              />
            </TouchableOpacity>
            {input.length > 0 && (
              <TouchableOpacity onPress={onSend}>
                <Icon
                  name="send"
                  vector="FontAwesome"
                  size={moderateScale(24)}
                  color={theme.colors.primary80}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </GradientContainer>
  );
}
