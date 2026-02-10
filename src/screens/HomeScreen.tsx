import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { RootStackNavigationProp } from '@/navigation/types';

interface HomeScreenProps {
  navigation: RootStackNavigationProp<'Home'>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Rick and Morty App
      </Text>
      <Text style={styles.subtitle}>
        Welcome to the Rick and Morty universe!
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('CharacterList')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          View Characters
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
