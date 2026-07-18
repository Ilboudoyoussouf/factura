import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/theme/ThemeProvider';

import { GradientView } from './GradientView';

type AvatarProps = {
  name: string;
  size?: number;
};

export function Avatar({ name, size = 48 }: AvatarProps) {
  const { fontFamilies, colors } = useAppTheme();
  const initial = name.trim().charAt(0).toUpperCase() || '?';

  return (
    <GradientView style={[styles.base, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={{ fontFamily: fontFamilies.serifBold, fontSize: size * 0.42, color: colors.textInverse }}>
        {initial}
      </Text>
    </GradientView>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
});
