import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import type { IdeaNote } from '../../types';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
}

export function IdeaCard({ idea, onPress }: IdeaCardProps) {
  return (
    <Pressable onPress={onPress}>
      <Card style={[styles.card, { backgroundColor: idea.color }]}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>
            {idea.title}
          </Text>
          <View style={styles.tags}>
            {idea.tags.map((tag) => (
              <Chip key={tag} compact style={styles.chip}>
                {tag}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
  },
  title: {
    color: '#1A1A1A',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});
