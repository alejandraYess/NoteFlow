import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { FAB } from 'react-native-paper';
import { IdeaCard } from '../../../components/items/IdeaCard';
import { EmptyList } from '../../../components/EmptyList';
import { useNotesStore } from '../../../store/notesStore';
import { colors } from '../../../constants/theme';

export default function IdeasScreen() {
  const ideas = useNotesStore((s) => s.ideas);

  return (
    <View style={styles.container}>
      <FlashList
        data={ideas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyList message="No hay ideas todavía" />}
        renderItem={({ item }) => (
          <IdeaCard
            idea={item}
            onPress={() => router.push(`/(tabs)/ideas/${item.id}`)}
          />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        label="Nueva"
        onPress={() => router.push({ pathname: '/nueva-nota', params: { type: 'idea' } })}
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
