import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GradientContainer} from './src/components';
import Home from './src/screens/Home';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

export default function App() {
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
