import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/theme/ThemeProvider';

type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger';

type BadgeProps = {
  label: string;
  tone?: BadgeTone;
};

export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  const { colors, radii, spacing, fontFamilies } = useAppTheme();

  const toneColor =
    tone === 'success' ? colors.success : tone === 'warning' ? colors.warning : tone === 'danger' ? colors.danger : colors.textSecondary;

  return (
    <View
      style={[
        styles.base,
        {
          borderRadius: radii.pill,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xs,
          backgroundColor: `${toneColor}1A`,
        },
      ]}>
      <Text style={{ fontFamily: fontFamilies.sansSemiBold, fontSize: 11, color: toneColor, letterSpacing: 0.4 }}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

export function StatusBadge({ status }: { status: 'draft' | 'finalized' }) {
  return status === 'draft' ? <Badge label="Brouillon" tone="warning" /> : <Badge label="Finalisée" tone="success" />;
}

const styles = StyleSheet.create({
  base: { alignSelf: 'flex-start' },
});
