import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { colors } from './theme';

export function getStackScreenOptions(isDark: boolean): NativeStackNavigationOptions {
  const palette = isDark ? colors.dark : colors.light;
  const headerBackground = isDark ? '#3B2D55' : palette.primary;

  return {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: headerBackground,
    },
    headerTitleStyle: {
      fontWeight: '700',
      fontSize: 28,
      color: '#FFFFFF',
    },
    headerTintColor: '#FFFFFF',
    headerShadowVisible: false,
  };
}
