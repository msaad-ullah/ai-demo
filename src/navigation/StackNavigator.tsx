import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {StackParamsList} from './types';
import Screens from './Screens';
import {ChatScreen, VoiceScreen} from '../screens';

const Stack = createStackNavigator<StackParamsList>();

const options: StackNavigationOptions = {
  headerShown: false,
};

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name={Screens.VoiceScreen} component={VoiceScreen} />
      <Stack.Screen name={Screens.ChatScreen} component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
