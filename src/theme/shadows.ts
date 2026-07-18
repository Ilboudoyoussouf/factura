import { Platform } from 'react-native';

type ShadowStyle = {
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
};

function buildShadow(color: string, opacity: number, radius: number, elevation: number): ShadowStyle {
  return Platform.select<ShadowStyle>({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: Math.round(radius / 2) },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    default: { elevation },
  }) as ShadowStyle;
}

export function buildShadows(mode: 'light' | 'dark') {
  const color = mode === 'light' ? '#1B1A19' : '#000000';
  const opacity = mode === 'light' ? 0.08 : 0.4;
  return {
    sm: buildShadow(color, opacity, 6, 2),
    md: buildShadow(color, opacity + 0.02, 14, 6),
    lg: buildShadow(color, opacity + 0.04, 24, 12),
  };
}

export type Shadows = ReturnType<typeof buildShadows>;
