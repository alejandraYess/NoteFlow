import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface EmptyListProps {
  message: string;
}

export function EmptyList({ message }: EmptyListProps) {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  text: {
    opacity: 0.6,
    textAlign: 'center',
  },
});
