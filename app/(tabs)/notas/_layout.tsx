import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { getStackScreenOptions } from '../../../constants/navigation';

export default function NotasLayout() {
  const isDark = useColorScheme() === 'dark';

  return (
    <Stack screenOptions={getStackScreenOptions(isDark)}>
      <Stack.Screen name="index" options={{ title: 'Notas' }} />
      <Stack.Screen name="[id]" options={{ title: 'Detalle' }} />
    </Stack>
  );
}
