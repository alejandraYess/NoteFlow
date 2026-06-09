import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { FAB } from 'react-native-paper';
import { NoteCard } from '../../../components/items/NoteCard';
import { EmptyList } from '../../../components/EmptyList';
import { useNotesStore } from '../../../store/notesStore';
import { colors } from '../../../constants/theme';

export default function NotasScreen() {
  const notes = useNotesStore((s) => s.notes);

  return (
    <View style={styles.container}>
      <FlashList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyList message="No hay notas todavía" />}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => router.push(`/(tabs)/notas/${item.id}`)}
          />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        label="Nueva"
        onPress={() => router.push({ pathname: '/nueva-nota', params: { type: 'note' } })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  list: {
    padding: 16,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
