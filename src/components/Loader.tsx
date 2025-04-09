import {ActivityIndicator} from 'react-native';
import {View} from '.';
import GradientContainer from './GradientContainer';
import {useTheme} from '../hooks';

export default function Loader() {
  const theme = useTheme();
  return (
    <GradientContainer>
      <View flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator color={theme.colors.primary40} size="large" />
      </View>
    </GradientContainer>
  );
}
