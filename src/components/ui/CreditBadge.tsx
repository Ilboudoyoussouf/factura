import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/theme/ThemeProvider';

type CreditBadgeProps = {
  amount: number;
  size?: 'sm' | 'md';
};

export function CreditBadge({ amount, size = 'md' }: CreditBadgeProps) {
  const { colors, radii, spacing, fontFamilies } = useAppTheme();
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.base,
        {
          borderRadius: radii.pill,
          paddingHorizontal: isSmall ? spacing.sm : spacing.md,
          paddingVertical: isSmall ? 4 : spacing.xs,
          backgroundColor: colors.surfaceElevated,
          borderColor: colors.border,
        },
      ]}>
      <Text style={{ fontSize: isSmall ? 13 : 15 }}>✦</Text>
      <Text
        style={{
          fontFamily: fontFamilies.sansSemiBold,
          fontSize: isSmall ? 13 : 15,
          color: colors.textPrimary,
        }}>
        {amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'flex-start',
  },
});
