export type ThemeColors = {
  background: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textInverse: string;
  primary: string;
  primaryGradient: readonly [string, string];
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  overlay: string;
  glassFill: string;
  glassBorder: string;
};

export const lightColors: ThemeColors = {
  background: '#FBF9F6',
  surface: '#FFFFFF',
  surfaceElevated: '#F3EFE9',
  border: '#E7E1D8',
  textPrimary: '#1B1A19',
  textSecondary: '#6B6560',
  textInverse: '#FBF9F6',
  primary: '#B08D57',
  primaryGradient: ['#E8C77E', '#B08D57'],
  secondary: '#E7B8C2',
  success: '#4C8B6B',
  danger: '#C1483B',
  warning: '#D9A441',
  overlay: 'rgba(27, 26, 25, 0.45)',
  glassFill: 'rgba(255, 255, 255, 0.6)',
  glassBorder: 'rgba(27, 26, 25, 0.08)',
};

export const darkColors: ThemeColors = {
  background: '#121113',
  surface: '#1C1B1E',
  surfaceElevated: '#26242A',
  border: 'rgba(255, 255, 255, 0.08)',
  textPrimary: '#F5F1EA',
  textSecondary: '#A9A29A',
  textInverse: '#121113',
  primary: '#D9B36C',
  primaryGradient: ['#F0D28C', '#B08D57'],
  secondary: '#D98FA3',
  success: '#6FBE95',
  danger: '#E6685A',
  warning: '#E6B85C',
  overlay: 'rgba(0, 0, 0, 0.6)',
  glassFill: 'rgba(28, 27, 30, 0.6)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

export type ThemeMode = 'light' | 'dark';
