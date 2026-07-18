import { createContext, useContext, useMemo, type ReactNode } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeStore } from '@/store/useThemeStore';

import { darkColors, lightColors, type ThemeColors, type ThemeMode } from './colors';
import { buildShadows, type Shadows } from './shadows';
import { radii, spacing } from './spacing';
import { fontFamilies, typeScale } from './typography';

type ThemeContextValue = {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: typeof spacing;
  radii: typeof radii;
  shadows: Shadows;
  fontFamilies: typeof fontFamilies;
  typeScale: typeof typeScale;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const preference = useThemeStore((state) => state.preference);

  const mode: ThemeMode = preference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : preference;

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      colors: mode === 'dark' ? darkColors : lightColors,
      spacing,
      radii,
      shadows: buildShadows(mode),
      fontFamilies,
      typeScale,
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
}
