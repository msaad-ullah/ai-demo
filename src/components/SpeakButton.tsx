import {StyleSheet, TouchableOpacity} from 'react-native';

import Icon from './Icon';
import View from './View';
import {useTheme} from '../hooks';
import {horizontalScale, moderateScale} from '../helpers/metrics';

export default function SpeakButton() {
  const theme = useTheme();
  return (
    <TouchableOpacity>
      <View
        p="md"
        justifyContent="center"
        alignItems="center"
        style={[
          styles.container,
          {
            borderColor: theme.colors.white,
          },
        ]}>
        <Icon
          name={'microphone-alt'}
          color={theme.colors.primary20}
          size={moderateScale(40)}
          vector="FontAwesome5"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    width: horizontalScale(100),
    height: undefined,
    aspectRatio: 1,
    borderRadius: horizontalScale(100) / 2,
  },
});
