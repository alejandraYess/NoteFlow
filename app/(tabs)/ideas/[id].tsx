import { View, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, Button, Chip } from 'react-native-paper';
import { useNotesStore } from '../../../store/notesStore';
import { hapticLight } from '../../../utils/haptics';
import { goBackSafe } from '../../../utils/navigation';
import { colors } from '../../../constants/theme';

export default function IdeaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idea = useNotesStore((s) => s.ideas.find((i) => i.id === id));
  const deleteIdea = useNotesStore((s) => s.deleteIdea);

  if (!idea) {
    return (
      <>
        <Stack.Screen options={{ title: 'Detalle idea' }} />
        <View style={styles.container}>
          <Text variant="bodyLarge">Idea no encontrada</Text>
        </View>
      </>
    );
  }

  const current = idea;

  function handleDelete() {
    Alert.alert('Eliminar idea', '¿Seguro que quieres eliminar esta idea?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await hapticLight();
          deleteIdea(current.id);
          goBackSafe('/(tabs)/ideas');
        },
      },
    ]);
  }

  return (
    <>
      <Stack.Screen options={{ title: current.title }} />
      <View style={[styles.container, { backgroundColor: current.color }]}>
        <Text variant="headlineSmall" style={styles.title}>
          {current.title}
        </Text>
        <View style={styles.tags}>
          {current.tags.map((tag) => (
            <Chip key={tag} compact>
              {tag}
            </Chip>
          ))}
        </View>
        <Text variant="labelSmall" style={styles.date}>
          Actualizada: {current.updatedAt.toLocaleDateString('es-ES')}
        </Text>
        <Button
          mode="outlined"
          onPress={handleDelete}
          textColor="#B00020"
          style={styles.delete}
        >
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
  },
  title: {
    color: '#1A1A1A',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  date: {
    color: '#1A1A1A',
    opacity: 0.6,
  },
  delete: {
    marginTop: 'auto',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
});
