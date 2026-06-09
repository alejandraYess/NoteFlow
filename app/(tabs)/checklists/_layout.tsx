import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { getStackScreenOptions } from '../../../constants/navigation';

export default function ChecklistsLayout() {
  const isDark = useColorScheme() === 'dark';

  return (
    <Stack screenOptions={getStackScreenOptions(isDark)}>
      <Stack.Screen name="index" options={{ title: 'Tareas' }} />
      <Stack.Screen name="[id]" options={{ title: 'Detalle' }} />
    </Stack>
  );
}
