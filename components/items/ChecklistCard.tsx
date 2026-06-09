import { Pressable, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar } from 'react-native-paper';
import type { ChecklistNote } from '../../types';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
}

export function ChecklistCard({ checklist, onPress }: ChecklistCardProps) {
  const total = checklist.items.length;
  const completed = checklist.items.filter((i) => i.isCompleted).length;
  const progress = total > 0 ? completed / total : 0;

  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">{checklist.title}</Text>
          <Text variant="bodyMedium" style={styles.progress}>
            {completed} de {total} completadas
          </Text>
          <ProgressBar progress={progress} style={styles.bar} />
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
  },
  progress: {
    marginTop: 4,
    opacity: 0.7,
  },
  bar: {
    marginTop: 8,
    height: 6,
    borderRadius: 3,
  },
});
