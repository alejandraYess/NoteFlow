import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, createAppTheme } from '../constants/theme';
import { useNotesStore } from '../store/notesStore';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [hydrated, setHydrated] = useState(useNotesStore.persist.hasHydrated());

  useEffect(() => {
    const unsub = useNotesStore.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);

  const theme = createAppTheme(isDark);

  if (!hydrated) {
    return (
      <View style={[styles.loading, { backgroundColor: colors.light.background }]}>
        <ActivityIndicator size="large" color={colors.light.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="nueva-nota"
            options={{ presentation: 'modal', title: 'Nueva nota' }}
          />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
