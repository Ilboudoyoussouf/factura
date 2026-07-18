import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { useAppTheme } from '@/theme/ThemeProvider';

type ScreenContainerProps = {
  children: ReactNode;
  edges?: Edge[];
  style?: ViewStyle;
  padded?: boolean;
};

export function ScreenContainer({ children, edges = ['top'], style, padded = true }: ScreenContainerProps) {
  const { colors, spacing } = useAppTheme();
  return (
    <SafeAreaView edges={edges} style={[styles.flex, { backgroundColor: colors.background }]}>
      <View
        style={[styles.flex, padded ? { paddingHorizontal: spacing.xl } : undefined, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
