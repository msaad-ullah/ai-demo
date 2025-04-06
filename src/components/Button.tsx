// A custom reusable button component
import React from 'react';
import {
  TouchableOpacity,
  type TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import Text from './Text';
import useTheme from '../hooks/useTheme';
import Apptheme, {FontFamily} from '../styles/theme/theme';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

// defining the types for quick common stylings through props and suggestions
interface IProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary';
  backgroundColor?: keyof typeof Apptheme.colors;
  textColor?: keyof typeof Apptheme.colors;
  loading?: boolean;
  loadingText?: string;
}

export default function Button({
  label,
  style,
  backgroundColor = 'primary60',
  textColor = 'white',
  loading = false,
  loadingText,
  ...rest
}: IProps) {
  const theme = useTheme();
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: loading
      ? withRepeat(
          withSequence(
            withTiming(0.4, {duration: 500}),
            withTiming(1, {duration: 500}),
          ),
          -1,
        )
      : 1,
  }));
  return (
    <TouchableOpacity
      {...rest}
      disabled={loading}
      style={[
        {
          backgroundColor: theme.colors[backgroundColor],
          padding: theme.spacing.lg,
          borderRadius: 40,
          width: '100%',
        },
        style as ViewStyle,
      ]}>
      {!loading ? (
        <Text color={textColor} textAlign="center" variant="semibold">
          {label}
        </Text>
      ) : (
        <Animated.Text
          style={[
            {
              color: theme.colors[textColor],
              textAlign: 'center',
              fontFamily: FontFamily.semibold,
              fontSize: theme.fontSizes.body,
            },
            animatedStyles,
          ]}>
          {loadingText}
        </Animated.Text>
      )}
    </TouchableOpacity>
  );
}
