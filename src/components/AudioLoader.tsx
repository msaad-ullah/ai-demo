import {ActivityIndicator} from 'react-native';
import View from './View';
import Text from './Text';
import {useTheme} from '../hooks';

export default function AudioLoader() {
  const theme = useTheme();
  return (
    <View
      style={{
        width: '100%',
        position: 'absolute',
        top: 100,
        zIndex: 99,
      }}
      alignItems="center">
      <View
        backgroundColor="neutral90"
        p="xs"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={8}
        style={{width: '50%', borderRadius: 20}}
        mt="xs">
        <ActivityIndicator color={theme.colors.neutral50} size="small" />
        <Text size="xs" color="neutral50">
          Loading audio
        </Text>
      </View>
    </View>
  );
}
