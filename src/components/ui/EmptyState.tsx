import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/theme/ThemeProvider';

import { Button } from './Button';

type EmptyStateProps = {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function EmptyState({ icon = '✦', title, description, actionLabel, onActionPress }: EmptyStateProps) {
  const { colors, spacing, typeScale } = useAppTheme();

  return (
    <View style={[styles.container, { paddingVertical: spacing.xxxl, gap: spacing.sm }]}>
      <Text style={{ fontSize: 32 }}>{icon}</Text>
      <Text style={[typeScale.h2, { color: colors.textPrimary, textAlign: 'center' }]}>{title}</Text>
      {description ? (
        <Text style={[typeScale.body, { color: colors.textSecondary, textAlign: 'center' }]}>{description}</Text>
      ) : null}
      {actionLabel && onActionPress ? (
        <Button label={actionLabel} onPress={onActionPress} fullWidth={false} style={{ marginTop: spacing.md, paddingHorizontal: spacing.xl }} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
});
