import {useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {RadialImage, Text, View, SpeakButton} from '../components';
import {useTheme} from '../hooks';
import {
  getMicrophonePermission,
  getSpeechRecognitionPermission,
} from '../services/permissions';

export default function Home() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  useEffect(() => {
    getMicrophonePermission();
    getSpeechRecognitionPermission();
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
          Hey there, what can I do for you today?
        </Text>
        <RadialImage />
        <SpeakButton />
      </View>
    </View>
  );
}
