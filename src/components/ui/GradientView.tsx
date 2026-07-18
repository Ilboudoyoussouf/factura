import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { useAppTheme } from '@/theme/ThemeProvider';

type GradientViewProps = {
  children?: ReactNode;
  colors?: readonly [string, string, ...string[]];
  style?: StyleProp<ViewStyle>;
  angleDeg?: number;
};

function angleToPoints(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    start: { x: 0.5 - Math.sin(rad) / 2, y: 0.5 + Math.cos(rad) / 2 },
    end: { x: 0.5 + Math.sin(rad) / 2, y: 0.5 - Math.cos(rad) / 2 },
  };
}

export function GradientView({ children, colors, style, angleDeg = 135 }: GradientViewProps) {
  const { colors: themeColors } = useAppTheme();
  const { start, end } = angleToPoints(angleDeg);
  return (
    <LinearGradient
      colors={colors ?? themeColors.primaryGradient}
      start={start}
      end={end}
      style={style}>
      {children}
    </LinearGradient>
  );
}
