import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import Stack from './StackNavigator';

export default function MainNavigation() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack />
    </NavigationContainer>
  );
}
