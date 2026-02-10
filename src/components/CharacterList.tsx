import React, { useEffect, useCallback } from 'react';
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
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';

export const CharacterList: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'CharacterList'>>();
  
  // Split selectors to avoid unnecessary re-renders
  const characters = useStore((state) => state.characters);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const fetchCharacters = useStore((state) => state.fetchCharacters);

  useEffect(() => {
    fetchCharacters();
  }, []); // Safe to use empty deps since fetchCharacters is stable in Zustand

  // Memoize navigation handler
  const handleCharacterPress = useCallback(
    (characterId: number) => {
      navigation.navigate('CharacterProfile', { characterId });
    },
    [navigation]
  );

  // Memoize renderItem to avoid recreating on every render
  const renderItem = useCallback(
    ({ item }: { item: Character }) => (
      <View style={styles.cardWrapper}>
        <CharacterCard
          character={item}
          onPress={() => handleCharacterPress(item.id)}
        />
      </View>
    ),
    [handleCharacterPress]
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
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
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={true}
      removeClippedSubviews={true}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: Spacing.sm,
    maxWidth: 972,
    width: '100%',
    alignSelf: 'center',
  },
  cardWrapper: {
    flex: 1,
    margin: Spacing.sm,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  loadingText: {
    marginTop: Spacing.lg,
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    fontSize: FontSize.sm,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  retryButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: FontSize.sm,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
  },
});
