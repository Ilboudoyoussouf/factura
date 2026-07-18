import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { useAppTheme } from '@/theme/ThemeProvider';

type InputProps = TextInputProps & {
  label?: string;
  errorText?: string;
};

export function Input({ label, errorText, style, ...rest }: InputProps) {
  const { colors, radii, spacing, fontFamilies } = useAppTheme();

  return (
    <View style={{ gap: spacing.xs }}>
      {label ? (
        <Text style={{ fontFamily: fontFamilies.sansSemiBold, fontSize: 12, color: colors.textSecondary }}>
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholderTextColor={colors.textSecondary}
        style={[
          styles.base,
          {
            borderRadius: radii.md,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.md,
            backgroundColor: colors.surface,
            borderColor: errorText ? colors.danger : colors.border,
            color: colors.textPrimary,
            fontFamily: fontFamilies.sans,
            fontSize: 15,
          },
          style,
        ]}
        {...rest}
      />
      {errorText ? (
        <Text style={{ fontFamily: fontFamilies.sans, fontSize: 12, color: colors.danger }}>{errorText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { borderWidth: StyleSheet.hairlineWidth },
});
