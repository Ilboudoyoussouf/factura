import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { useAppTheme } from '@/theme/ThemeProvider';

import { GradientView } from './GradientView';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  style,
  fullWidth = true,
}: ButtonProps) {
  const { colors, spacing, radii, fontFamilies } = useAppTheme();

  const handlePress = useCallback(() => {
    if (disabled || loading) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  }, [disabled, loading, onPress]);

  const isDisabled = disabled || loading;
  const textStyle = {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 15,
    color: variant === 'primary' ? colors.textInverse : variant === 'danger' ? '#FFFFFF' : colors.textPrimary,
  };

  const content = loading ? (
    <ActivityIndicator color={variant === 'primary' ? colors.textInverse : colors.textPrimary} />
  ) : (
    <Text style={textStyle}>{label}</Text>
  );

  const baseStyle: StyleProp<ViewStyle> = [
    styles.base,
    { borderRadius: radii.lg, paddingVertical: spacing.md, opacity: isDisabled ? 0.5 : 1 },
    fullWidth ? styles.fullWidth : undefined,
  ];

  if (variant === 'primary') {
    return (
      <Pressable onPress={handlePress} disabled={isDisabled} style={style}>
        <GradientView style={baseStyle}>{content}</GradientView>
      </Pressable>
    );
  }

  const variantStyle: ViewStyle =
    variant === 'secondary'
      ? { backgroundColor: colors.surfaceElevated }
      : variant === 'danger'
        ? { backgroundColor: colors.danger }
        : { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={[baseStyle, variantStyle, style]}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
});
