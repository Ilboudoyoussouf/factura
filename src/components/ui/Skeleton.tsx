import { useEffect, useRef } from 'react';
import { Animated, type ViewStyle } from 'react-native';

import { useAppTheme } from '@/theme/ThemeProvider';

type SkeletonProps = {
  width: number | `${number}%`;
  height: number;
  radius?: number;
  style?: ViewStyle;
};

export function Skeleton({ width, height, radius = 8, style }: SkeletonProps) {
  const { colors } = useAppTheme();
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width, height, borderRadius: radius, backgroundColor: colors.surfaceElevated, opacity },
        style,
      ]}
    />
  );
}
