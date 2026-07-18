import { Text, type StyleProp, type TextStyle } from 'react-native';

import { useAppTheme } from '@/theme/ThemeProvider';

type GradientTextProps = {
  children: string;
  style?: StyleProp<TextStyle>;
  colors?: readonly [string, string, ...string[]];
};

/**
 * Approximates a gradient look with the gradient's leading color, avoiding a
 * masked-view native dependency for a purely decorative effect.
 */
export function GradientText({ children, style, colors }: GradientTextProps) {
  const { colors: themeColors } = useAppTheme();
  const tint = (colors ?? themeColors.primaryGradient)[0];
  return <Text style={[style, { color: tint }]}>{children}</Text>;
}
