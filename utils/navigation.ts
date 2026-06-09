import { router } from 'expo-router';

type TabRoute = '/(tabs)/notas' | '/(tabs)/checklists' | '/(tabs)/ideas';

export function goBackSafe(fallback: TabRoute) {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(fallback);
  }
}

export function closeModal(fallback: TabRoute) {
  goBackSafe(fallback);
}
