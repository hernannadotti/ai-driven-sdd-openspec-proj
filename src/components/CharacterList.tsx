import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '@/navigation/types';
import { useStore } from '@/store';
import { CharacterCard } from './CharacterCard';
import type { Character } from '@/api/types';

export const CharacterList: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'CharacterList'>>();
  const { characters, loading, error, fetchCharacters } = useStore();

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading characters...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          onPress={() => fetchCharacters()}
          style={styles.retryButton}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (characters.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No characters found</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={characters}
      numColumns={2}
      keyExtractor={(item: Character) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <CharacterCard
            character={item}
            onPress={() => navigation.navigate('CharacterProfile', { characterId: item.id })}
          />
        </View>
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={true}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  listContent: {
    padding: 8,
    maxWidth: 972,
    width: '100%',
    alignSelf: 'center',
  },
  cardWrapper: {
    flex: 1,
    margin: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
    color: '#4b5563',
    fontSize: 14,
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyText: {
    color: '#4b5563',
    fontSize: 14,
  },
});
