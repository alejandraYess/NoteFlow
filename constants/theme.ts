import { MD3LightTheme } from 'react-native-paper';

export const colors = {
  light: {
    background: '#F5F0FF',
    surface: '#FFFFFF',
    text: '#1E1B2E',
    primary: '#7C3AED',
    secondary: '#F59E0B',
    outline: '#C4B5FD',
    error: '#DC2626',
  },
  dark: {
    background: '#1A1028',
    surface: '#2A1F3D',
    text: '#F5F0FF',
    primary: '#A78BFA',
    secondary: '#FBBF24',
    outline: '#6D28D9',
    error: '#F87171',
  },
};

export const ideaPalette = [
  '#EDE9FE',
  '#DDD6FE',
  '#FDE68A',
  '#FBCFE8',
  '#BAE6FD',
];

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  title: 24,
  subtitle: 18,
  body: 16,
  small: 12,
};

export function createAppTheme(isDark: boolean) {
  const accent = isDark ? colors.dark : colors.light;
  const content = colors.light;

  return {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: accent.primary,
      secondary: accent.secondary,
      background: content.background,
      surface: content.surface,
      onSurface: content.text,
      onBackground: content.text,
      outline: content.outline,
      error: content.error,
      surfaceVariant: '#EDE9FE',
      onSurfaceVariant: content.text,
    },
  };
}
