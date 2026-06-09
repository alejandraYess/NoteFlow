import { View, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, Button } from 'react-native-paper';
import { useNotesStore } from '../../../store/notesStore';
import { hapticLight } from '../../../utils/haptics';
import { goBackSafe } from '../../../utils/navigation';
import { colors } from '../../../constants/theme';

export default function NotaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const note = useNotesStore((s) => s.notes.find((n) => n.id === id));
  const deleteNote = useNotesStore((s) => s.deleteNote);

  if (!note) {
    return (
      <>
        <Stack.Screen options={{ title: 'Detalle nota' }} />
        <View style={styles.container}>
          <Text variant="bodyLarge">Nota no encontrada</Text>
        </View>
      </>
    );
  }

  const current = note;

  function handleDelete() {
    Alert.alert('Eliminar nota', '¿Seguro que quieres eliminar esta nota?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await hapticLight();
          deleteNote(current.id);
          goBackSafe('/(tabs)/notas');
        },
      },
    ]);
  }

  return (
    <>
      <Stack.Screen options={{ title: current.title }} />
      <View style={styles.container}>
        <Text variant="headlineSmall">{current.title}</Text>
        <Text variant="bodyLarge" style={styles.content}>
          {current.content}
        </Text>
        <Text variant="labelSmall" style={styles.date}>
          Actualizada: {current.updatedAt.toLocaleDateString('es-ES')}
        </Text>
        <Button mode="outlined" onPress={handleDelete} textColor="#B00020">
          Eliminar
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
    backgroundColor: colors.light.background,
  },
  content: {
    lineHeight: 24,
  },
  date: {
    opacity: 0.5,
    marginBottom: 8,
  },
});
