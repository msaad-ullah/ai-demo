import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {VoiceScreen, ChatScreen} from '../screens';
import {type BottomTabsParamsList} from './types';
import Screens from './Screens';
import theme from '../styles/theme/theme';

const Tabs = createBottomTabNavigator<BottomTabsParamsList>();
const options: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: theme.colors.black,
  },
};

const BottomTabs = () => {
  return (
    <Tabs.Navigator screenOptions={options}>
      <Tabs.Screen name={Screens.VoiceScreen} component={VoiceScreen} />
      <Tabs.Screen name={Screens.ChatScreen} component={ChatScreen} />
    </Tabs.Navigator>
  );
};

export default BottomTabs;
