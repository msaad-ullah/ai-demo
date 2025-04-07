import {Alert, Linking, Platform} from 'react-native';
import {request, PERMISSIONS, check} from 'react-native-permissions';

export async function getSpeechRecognitionPermission() {
  try {
    if (Platform.OS === 'ios') {
      const result = await check(PERMISSIONS.IOS.SPEECH_RECOGNITION);

      if (result === 'granted') {
        console.log('speech recognition permission grated');
      } else if (result === 'denied') {
        await request(PERMISSIONS.IOS.SPEECH_RECOGNITION);
      } else {
        Alert.alert(
          'Required Permission',
          'Please allow app to use speech recognition',
          [
            {text: 'Cancel'},
            {text: 'Settings', onPress: () => Linking.openSettings()},
          ],
        );
      }

      return result;
    }
  } catch (err) {
    console.log('getSpeechRecognitionPermission error', err);
  }
}

export async function getMicrophonePermission() {
  try {
    const result = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO,
    );

    if (result === 'granted') {
      console.log('Microphone permission grated');
    } else if (result === 'denied') {
      await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.MICROPHONE
          : PERMISSIONS.ANDROID.RECORD_AUDIO,
      );
    } else {
      Alert.alert('Required Permission', 'Please allow app to use microhone', [
        {text: 'Cancel'},
        {text: 'Settings', onPress: () => Linking.openSettings()},
      ]);
    }

    return result;
  } catch (err) {
    console.log('getMicrophonePermission error', err);
  }
}
