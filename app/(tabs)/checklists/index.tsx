import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { FAB } from 'react-native-paper';
import { ChecklistCard } from '../../../components/items/ChecklistCard';
import { EmptyList } from '../../../components/EmptyList';
import { useNotesStore } from '../../../store/notesStore';
import { colors } from '../../../constants/theme';

export default function ChecklistsScreen() {
  const checklists = useNotesStore((s) => s.checklists);

  return (
    <View style={styles.container}>
      <FlashList
        data={checklists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyList message="No hay checklists todavía" />}
        renderItem={({ item }) => (
          <ChecklistCard
            checklist={item}
            onPress={() => router.push(`/(tabs)/checklists/${item.id}`)}
          />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        label="Nueva"
        onPress={() =>
          router.push({ pathname: '/nueva-nota', params: { type: 'checklist' } })
        }
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
