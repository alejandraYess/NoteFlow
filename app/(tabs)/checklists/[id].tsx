import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, Button, Checkbox, List } from 'react-native-paper';
import { colors } from '../../../constants/theme';
import { useNotesStore } from '../../../store/notesStore';
import { hapticLight, hapticSuccess } from '../../../utils/haptics';
import { goBackSafe } from '../../../utils/navigation';

function getRouteId(id: string | string[] | undefined) {
  if (Array.isArray(id)) return id[0];
  return id;
}

export default function ChecklistDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const checklistId = getRouteId(id);
  const checklist = useNotesStore((s) => s.checklists.find((c) => c.id === checklistId));
  const toggleChecklistItem = useNotesStore((s) => s.toggleChecklistItem);
  const deleteChecklist = useNotesStore((s) => s.deleteChecklist);

  if (!checklist) {
    return (
      <>
        <Stack.Screen options={{ title: 'Detalle checklist' }} />
        <View style={styles.container}>
          <Text variant="bodyLarge">Checklist no encontrada</Text>
        </View>
      </>
    );
  }

  const current = checklist;

  function handleToggle(itemId: string) {
    const item = current.items.find((i) => i.id === itemId);
    const willComplete = item && !item.isCompleted;

    toggleChecklistItem(current.id, itemId);

    if (willComplete) {
      const allOthersDone = current.items
        .filter((i) => i.id !== itemId)
        .every((i) => i.isCompleted);
      if (allOthersDone) {
        hapticSuccess();
      }
    }
  }

  function handleDelete() {
    Alert.alert('Eliminar checklist', '¿Seguro que quieres eliminar esta lista?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await hapticLight();
          deleteChecklist(current.id);
          goBackSafe('/(tabs)/checklists');
        },
      },
    ]);
  }

  return (
    <>
      <Stack.Screen options={{ title: current.title }} />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.light.background }]}
        contentContainerStyle={styles.content}
      >
        <Text variant="labelSmall" style={styles.date}>
          Actualizada: {current.updatedAt.toLocaleDateString('es-ES')}
        </Text>
        {current.items.length === 0 ? (
          <Text variant="bodyLarge" style={{ color: colors.light.text, opacity: 0.7 }}>
            Esta lista no tiene tareas.
          </Text>
        ) : (
          current.items.map((item) => (
            <List.Item
              key={item.id}
              title={item.text}
              titleStyle={[
                { color: colors.light.text },
                item.isCompleted && styles.completed,
              ]}
              onPress={() => handleToggle(item.id)}
              left={() => (
                <Checkbox
                  status={item.isCompleted ? 'checked' : 'unchecked'}
                  onPress={() => handleToggle(item.id)}
                />
              )}
              style={styles.listItem}
            />
          ))
        )}
        <Button
          mode="outlined"
          onPress={handleDelete}
          textColor={colors.light.error}
          style={styles.delete}
        >
          Eliminar
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  date: {
    opacity: 0.5,
    marginBottom: 8,
  },
  listItem: {
    paddingVertical: 4,
  },
  completed: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  delete: {
    marginTop: 24,
  },
});
