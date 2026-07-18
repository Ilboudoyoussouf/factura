import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useAppTheme } from '@/theme/ThemeProvider';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function Chip({ label, selected, onPress }: ChipProps) {
  const { colors, radii, spacing, fontFamilies } = useAppTheme();

  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync();
        onPress?.();
      }}
      style={[
        styles.base,
        {
          borderRadius: radii.pill,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
          backgroundColor: selected ? colors.primary : colors.surfaceElevated,
          borderColor: selected ? colors.primary : colors.border,
        },
      ]}>
      <Text
        style={{
          fontFamily: fontFamilies.sansSemiBold,
          fontSize: 13,
          color: selected ? colors.textInverse : colors.textPrimary,
        }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderWidth: StyleSheet.hairlineWidth },
});
