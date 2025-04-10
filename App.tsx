import {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import trackPlayerSetup from './trackPlayer';
import MainNavigation from './src/navigation';

export default function App() {
  useEffect(() => {
    trackPlayerSetup();
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <MainNavigation />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
