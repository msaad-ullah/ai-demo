import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GradientContainer} from './src/components';
import Home from './src/screens/Home';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import trackPlayerSetup from './trackPlayer';
import {useEffect} from 'react';
import Config from 'react-native-config';

console.log(Config.API_URL, Config.API_TOKEN);

export default function App() {
  useEffect(() => {
    trackPlayerSetup();
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GradientContainer>
          <Home />
        </GradientContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
