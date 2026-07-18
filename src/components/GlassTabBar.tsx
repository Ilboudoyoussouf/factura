import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppTheme } from '@/theme/ThemeProvider';

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home',
  gallery: 'grid',
  'my-cards': 'albums',
  wallet: 'wallet',
  profile: 'person-circle',
};

const LABELS: Record<string, string> = {
  index: 'Accueil',
  gallery: 'Galerie',
  'my-cards': 'Mes cartes',
  wallet: 'Portefeuille',
  profile: 'Profil',
};

export function GlassTabBar({ state, navigation }: BottomTabBarProps) {
  const { colors, radii, spacing, fontFamilies, mode } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom || spacing.md, paddingHorizontal: spacing.lg }]}>
      <BlurView
        intensity={40}
        tint={mode}
        style={[
          styles.bar,
          {
            borderRadius: radii.xl,
            borderColor: colors.glassBorder,
            backgroundColor: colors.glassFill,
          },
        ]}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const iconName = ICONS[route.name] ?? 'ellipse';
          const label = LABELS[route.name] ?? route.name;

          const onPress = () => {
            Haptics.selectionAsync();
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable key={route.key} onPress={onPress} style={styles.item}>
              <Ionicons name={iconName} size={22} color={focused ? colors.primary : colors.textSecondary} />
              <Text
                style={{
                  fontFamily: focused ? fontFamilies.sansSemiBold : fontFamilies.sansMedium,
                  fontSize: 11,
                  color: focused ? colors.primary : colors.textSecondary,
                  marginTop: 2,
                }}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  bar: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
