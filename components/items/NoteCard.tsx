import { Pressable, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import type { Note } from '../../types';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

function formatDate(date: Date) {
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function NoteCard({ note, onPress }: NoteCardProps) {
  const preview =
    note.content.length > 80 ? `${note.content.slice(0, 80)}…` : note.content;

  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">{note.title}</Text>
          <Text variant="bodyMedium" style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>
          <Text variant="labelSmall" style={styles.date}>
            {formatDate(note.updatedAt)}
          </Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
  },
  preview: {
    marginTop: 4,
    opacity: 0.7,
  },
  date: {
    marginTop: 8,
    opacity: 0.5,
  },
});
