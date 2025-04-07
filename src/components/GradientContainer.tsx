import {type PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import useTheme from '../hooks/useTheme';

export default function GradientContainer({children}: PropsWithChildren) {
  const theme = useTheme();

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[
        theme.colors.primary100,
        theme.colors.black,
        theme.colors.primary100,
      ]}
      locations={[0.1, 0.3, 0.7]}
      useAngle={true}
      angle={130}
      angleCenter={{x: 0.5, y: 0.5}}
      style={styles.container}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
