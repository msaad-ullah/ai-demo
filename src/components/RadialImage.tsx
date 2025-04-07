import React, {useEffect} from 'react';
import {Image, StyleSheet, View as RNView} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  Easing,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';

import {useTheme} from '../hooks';
import {horizontalScale} from '../helpers/metrics';
import images from '../constants/images';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function RadialImage() {
  const theme = useTheme();

  const imageSize = horizontalScale(200);
  const ringBaseRadius = imageSize / 2;
  const maxScale = 2.5;
  const ringStrokeWidth = 1;
  const svgSize = ringBaseRadius * maxScale * 2 + ringStrokeWidth;

  const ringCount = 3;
  const loopDuration = 3600;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: loopDuration,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const ringAnimatedProps = Array.from({length: ringCount}, (_, i) => {
    const localProgress = useDerivedValue(() => {
      const offset = i / ringCount;
      const p = (progress.value + offset) % 1;
      return p;
    });

    return useAnimatedProps(() => {
      const p = localProgress.value;
      const scale = interpolate(p, [0, 1], [1, maxScale]);
      const opacity = interpolate(p, [0, 1], [0.5, 0]);

      return {
        r: ringBaseRadius * scale,
        opacity,
      };
    });
  });

  return (
    <RNView style={styles.wrapper}>
      <Svg
        height={svgSize}
        width={svgSize}
        style={styles.svg}
        viewBox={`0 0 ${svgSize} ${svgSize}`}>
        {ringAnimatedProps.map((animatedProps, i) => (
          <AnimatedCircle
            key={i}
            cx={svgSize / 2}
            cy={svgSize / 2}
            stroke={theme.colors.primary60}
            strokeWidth={ringStrokeWidth}
            fill="none"
            animatedProps={animatedProps}
          />
        ))}
      </Svg>

      <Image
        source={images.aiImage}
        style={[
          styles.image,
          {
            width: imageSize,
            borderRadius: imageSize / 2,
          },
        ]}
      />
    </RNView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  image: {
    height: undefined,
    aspectRatio: 1,
  },
});
