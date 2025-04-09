import {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import {GradientContainer} from './src/components';
import {store} from './src/redux/store';
import trackPlayerSetup from './trackPlayer';
import MainNavigation from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  useEffect(() => {
    trackPlayerSetup();
  }, []);
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <MainNavigation />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
