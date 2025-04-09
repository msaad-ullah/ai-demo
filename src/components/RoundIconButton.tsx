import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';
import {type IconVector} from './types';
import Icon from './Icon';
import {moderateScale} from '../helpers/metrics';
import {useTheme} from '../hooks';

interface IProps extends TouchableOpacityProps {
  iconName: string;
  iconVector: IconVector;
  showBackgroundColor?: boolean;
}

export default function RoundIconButton({
  iconName,
  iconVector,
  showBackgroundColor = true,
  ...rest
}: IProps) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.container,
        {
          backgroundColor: showBackgroundColor
            ? theme.colors.primary60
            : 'transparent',
        },
      ]}>
      <Icon
        name={iconName}
        vector={iconVector}
        size={moderateScale(20)}
        color={theme.colors.white}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: moderateScale(36),
    justifyContent: 'center',
    alignItems: 'center',
    height: undefined,
    aspectRatio: 1,
    borderRadius: moderateScale(36) / 2,
  },
});
