import * as Haptics from 'expo-haptics';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/theme/ThemeProvider';

type IconButtonProps = {
  children: ReactNode;
  onPress: () => void;
  variant?: 'surface' | 'glass' | 'plain';
  size?: number;
};

export function IconButton({ children, onPress, variant = 'surface', size = 40 }: IconButtonProps) {
  const { colors, radii } = useAppTheme();

  const backgroundColor =
    variant === 'surface' ? colors.surfaceElevated : variant === 'glass' ? colors.glassFill : 'transparent';

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      style={({ pressed }) => [
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: radii.pill,
          backgroundColor,
          opacity: pressed ? 0.7 : 1,
          borderColor: variant === 'glass' ? colors.glassBorder : 'transparent',
          borderWidth: variant === 'glass' ? StyleSheet.hairlineWidth : 0,
        },
      ]}>
      <View>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
});
