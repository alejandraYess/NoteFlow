import { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Text, TextInput, Button, Chip, IconButton } from 'react-native-paper';
import { z } from 'zod';
import { useNotesStore } from '../store/notesStore';
import { generateId } from '../utils/id';
import { closeModal } from '../utils/navigation';
import { colors, ideaPalette } from '../constants/theme';

const noteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
});

const checklistSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  items: z.array(z.string().min(1, 'La tarea no puede estar vacía')).min(1, 'Añade al menos una tarea'),
});

const ideaSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  tags: z.string().min(1, 'Añade al menos una etiqueta'),
  color: z.string().min(1, 'Selecciona un color'),
});

const IDEA_COLORS = ideaPalette;

type ContentType = 'note' | 'checklist' | 'idea';

const TAB_ROUTES: Record<ContentType, '/(tabs)/notas' | '/(tabs)/checklists' | '/(tabs)/ideas'> = {
  note: '/(tabs)/notas',
  checklist: '/(tabs)/checklists',
  idea: '/(tabs)/ideas',
};

export default function NuevaNotaScreen() {
  const { type: typeParam } = useLocalSearchParams<{ type?: string }>();
  const type = (typeParam ?? 'note') as ContentType;

  const addNote = useNotesStore((s) => s.addNote);
  const addChecklist = useNotesStore((s) => s.addChecklist);
  const addIdea = useNotesStore((s) => s.addIdea);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [tags, setTags] = useState('');
  const [color, setColor] = useState(IDEA_COLORS[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const titles: Record<ContentType, string> = {
    note: 'Nueva nota',
    checklist: 'Nueva checklist',
    idea: 'Nueva idea',
  };

  function handleSave() {
    const now = new Date();
    setErrors({});

    if (type === 'note') {
      const result = noteSchema.safeParse({ title: title.trim(), content: content.trim() });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const key = issue.path[0]?.toString() ?? 'form';
          fieldErrors[key] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }
      addNote({
        id: generateId(),
        title: result.data.title,
        content: result.data.content,
        createdAt: now,
        updatedAt: now,
      });
    }

    if (type === 'checklist') {
      const pendingItem = newItem.trim();
      const itemTexts = [
        ...items.map((i) => i.trim()).filter(Boolean),
        ...(pendingItem ? [pendingItem] : []),
      ];
      const result = checklistSchema.safeParse({ title: title.trim(), items: itemTexts });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const key = issue.path[0]?.toString() ?? 'form';
          fieldErrors[key] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }
      addChecklist({
        id: generateId(),
        title: result.data.title,
        items: result.data.items.map((text) => ({
          id: generateId(),
          text,
          isCompleted: false,
        })),
        createdAt: now,
        updatedAt: now,
      });
    }

    if (type === 'idea') {
      const result = ideaSchema.safeParse({
        title: title.trim(),
        tags: tags.trim(),
        color,
      });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const key = issue.path[0]?.toString() ?? 'form';
          fieldErrors[key] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }
      addIdea({
        id: generateId(),
        title: result.data.title,
        tags: result.data.tags.split(',').map((t) => t.trim()).filter(Boolean),
        color: result.data.color,
        createdAt: now,
        updatedAt: now,
      });
    }

    closeModal(TAB_ROUTES[type]);
  }

  function addChecklistItem() {
    const text = newItem.trim();
    if (!text) return;
    setItems((prev) => [...prev, text]);
    setNewItem('');
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: titles[type],
          presentation: 'modal',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor="#FFFFFF"
              onPress={() => closeModal(TAB_ROUTES[type])}
            />
          ),
        }}
      />
      <KeyboardAvoidingView
        style={[styles.flex, { backgroundColor: colors.light.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <TextInput
            label="Título"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            error={!!errors.title}
          />
          {errors.title && <Text style={styles.error}>{errors.title}</Text>}

          {type === 'note' && (
            <>
              <TextInput
                label="Contenido"
                value={content}
                onChangeText={setContent}
                mode="outlined"
                multiline
                numberOfLines={6}
                style={styles.textArea}
                error={!!errors.content}
              />
              {errors.content && <Text style={styles.error}>{errors.content}</Text>}
            </>
          )}

          {type === 'checklist' && (
            <>
              {items.map((item, index) => (
                <Text key={index} variant="bodyMedium" style={styles.item}>
                  • {item}
                </Text>
              ))}
              <View style={styles.row}>
                <TextInput
                  label="Nueva tarea"
                  value={newItem}
                  onChangeText={setNewItem}
                  mode="outlined"
                  style={styles.flex}
                  onSubmitEditing={addChecklistItem}
                />
                <Button mode="contained" onPress={addChecklistItem} style={styles.addBtn}>
                  +
                </Button>
              </View>
              {errors.items && <Text style={styles.error}>{errors.items}</Text>}
            </>
          )}

          {type === 'idea' && (
            <>
              <TextInput
                label="Etiquetas (separadas por coma)"
                value={tags}
                onChangeText={setTags}
                mode="outlined"
                error={!!errors.tags}
              />
              {errors.tags && <Text style={styles.error}>{errors.tags}</Text>}

              <Text variant="labelLarge" style={styles.colorLabel}>
                Color
              </Text>
              <View style={styles.colors}>
                {IDEA_COLORS.map((c) => (
                  <Chip
                    key={c}
                    selected={color === c}
                    onPress={() => setColor(c)}
                    style={[styles.colorChip, { backgroundColor: c }]}
                  >
                    {' '}
                  </Chip>
                ))}
              </View>
              {errors.color && <Text style={styles.error}>{errors.color}</Text>}
            </>
          )}

          <Button mode="contained" onPress={handleSave} style={styles.save}>
            Guardar
          </Button>
          <Button mode="outlined" onPress={() => closeModal(TAB_ROUTES[type])}>
            Cancelar
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 16,
    gap: 12,
  },
  textArea: {
    minHeight: 120,
  },
  error: {
    color: colors.light.error,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addBtn: {
    marginTop: 6,
  },
  item: {
    paddingLeft: 4,
  },
  colorLabel: {
    marginTop: 4,
  },
  colors: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  colorChip: {
    width: 40,
    height: 40,
  },
  save: {
    marginTop: 8,
  },
});
