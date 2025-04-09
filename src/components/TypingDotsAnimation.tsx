import React from 'react';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import View from './View';
import {useTheme} from '../hooks';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const TypingDotsAnimation = () => {
  const theme = useTheme();
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  React.useEffect(() => {
    dot1.value = withRepeat(
      withTiming(6, {duration: 300, easing: Easing.ease}),
      -1,
      true,
    );

    setTimeout(() => {
      dot2.value = withRepeat(
        withTiming(6, {duration: 300, easing: Easing.ease}),
        -1,
        true,
      );
    }, 150);

    setTimeout(() => {
      dot3.value = withRepeat(
        withTiming(6, {duration: 300, easing: Easing.ease}),
        -1,
        true,
      );
    }, 300);
  }, []);

  const animatedProps1 = useAnimatedProps(() => ({
    cy: 10 - dot1.value,
  }));

  const animatedProps2 = useAnimatedProps(() => ({
    cy: 10 - dot2.value,
  }));

  const animatedProps3 = useAnimatedProps(() => ({
    cy: 10 - dot3.value,
  }));

  return (
    <View mt="md" mb="xxl">
      <Svg height="60" width="60">
        <AnimatedCircle
          cx="10"
          cy="30"
          r="5"
          fill={theme.colors.neutral60}
          animatedProps={animatedProps1}
        />
        <AnimatedCircle
          cx="30"
          cy="30"
          r="5"
          fill={theme.colors.neutral60}
          animatedProps={animatedProps2}
        />
        <AnimatedCircle
          cx="50"
          cy="30"
          r="5"
          fill={theme.colors.neutral60}
          animatedProps={animatedProps3}
        />
      </Svg>
    </View>
  );
};

export default TypingDotsAnimation;
