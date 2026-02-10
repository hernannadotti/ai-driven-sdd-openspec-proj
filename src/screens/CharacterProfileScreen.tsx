import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from 'react-native';
import type { RootStackNavigationProp, RootStackRouteProp } from '@/navigation/types';
import { getCharacter, getEpisodesByIds } from '@/api/rickMorty';
import type { Character, Episode } from '@/api/types';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';

interface CharacterProfileScreenProps {
  navigation: RootStackNavigationProp<'CharacterProfile'>;
  route: RootStackRouteProp<'CharacterProfile'>;
}

type LoadingState = 'loading' | 'success' | 'error' | 'not-found';

// InfoCard Component (Task 4.1)
const InfoCard: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
};

// EpisodeItem Component (Task 5.1)
const EpisodeItem: React.FC<{ episode: Episode }> = ({ episode }) => {
  return (
    <View style={styles.episodeItem}>
      <Text style={styles.episodeName}>{episode.name}</Text>
      <Text style={styles.episodeNumber}>{episode.episode}</Text>
      <Text style={styles.episodeAirDate}>Aired: {episode.air_date}</Text>
    </View>
  );
};

// Status Badge Component (Task 3.4)
const StatusBadge: React.FC<{ status: Character['status'] }> = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'Alive':
        return { backgroundColor: Colors.successLight, borderColor: Colors.successBorder };
      case 'Dead':
        return { backgroundColor: Colors.errorLight, borderColor: Colors.errorBorder };
      default:
        return { backgroundColor: Colors.gray100, borderColor: Colors.border };
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'Alive':
        return Colors.successText;
      case 'Dead':
        return Colors.errorText;
      default:
        return Colors.gray900;
    }
  };

  return (
    <View style={[styles.statusBadge, getBadgeStyle()]}>
      <Text style={[styles.statusText, { color: getTextColor() }]}>{status}</Text>
    </View>
  );
};

export const CharacterProfileScreen: React.FC<CharacterProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const { characterId } = route.params;
  
  // State management (Task 2.5)
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [episodesLoading, setEpisodesLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Extract episode IDs from URLs
  const extractEpisodeIds = (episodeUrls: string[]): number[] => {
    return episodeUrls
      .map(url => {
        const match = url.match(/\/episode\/(\d+)$/);
        return match ? parseInt(match[1], 10) : null;
      })
      .filter((id): id is number => id !== null)
      .slice(0, 10); // Limit to first 10 (Task 5.5)
  };

  // Retry mechanism (Task 2.7) - Wrapped in useCallback to fix hooks dependencies
  const fetchCharacterData = useCallback(async () => {
    try {
      setLoadingState('loading');
      setError('');
      
      // Fetch character data (Task 2.3)
      const characterData = await getCharacter(characterId);
      setCharacter(characterData);
      setLoadingState('success');

      // Fetch episode data (Task 2.4)
      if (characterData.episode && characterData.episode.length > 0) {
        setEpisodesLoading(true);
        const episodeIds = extractEpisodeIds(characterData.episode);
        const episodesData = await getEpisodesByIds(episodeIds);
        setEpisodes(episodesData);
        setEpisodesLoading(false);
      }
    } catch (err) {
      // Error handling (Task 2.6)
      const error = err as { response?: { status?: number }; message?: string };
      if (error.response?.status === 404) {
        setLoadingState('not-found');
        setError('Character not found');
      } else {
        setLoadingState('error');
        setError(error.message || 'Failed to load character data');
      }
    }
  }, [characterId]);

  useEffect(() => {
    fetchCharacterData();
  }, [fetchCharacterData]);

  // Loading state UI (Task 6.1, 6.4)
  if (loadingState === 'loading') {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading character...</Text>
      </View>
    );
  }

  // Character not found error (Task 6.3)
  if (loadingState === 'not-found') {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Character Not Found</Text>
        <Text style={styles.errorMessage}>
          The character you're looking for doesn't exist.
        </Text>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  // Network error state (Task 6.2)
  if (loadingState === 'error') {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <Pressable
          onPress={fetchCharacterData}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!character) {
    return null;
  }

  // Success state - Full profile UI (Task 8.5)
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Profile Header (Tasks 3.1-3.5, 8.1-8.3) */}
      <View style={styles.header}>
        {/* Character Image (Task 3.1, 3.2) */}
        <Image
          source={{ uri: character.image }}
          style={styles.characterImage}
          resizeMode="cover"
        />
        
        {/* Character Name and Status (Task 3.3, 3.4, 3.5) */}
        <View style={styles.headerContent}>
          <Text style={styles.characterName}>{character.name}</Text>
          <StatusBadge status={character.status} />
        </View>
      </View>

      {/* Information Cards Grid (Tasks 4.2-4.5, 8.3) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information</Text>
        <View style={styles.cardsGrid}>
          <View style={styles.cardColumn}>
            <InfoCard label="Species" value={character.species || 'Unknown'} />
          </View>
          <View style={styles.cardColumn}>
            <InfoCard label="Gender" value={character.gender || 'Unknown'} />
          </View>
          <View style={styles.cardColumn}>
            <InfoCard label="Origin" value={character.origin?.name || 'Unknown'} />
          </View>
          <View style={styles.cardColumn}>
            <InfoCard label="Location" value={character.location?.name || 'Unknown'} />
          </View>
        </View>
      </View>

      {/* Episodes Section (Tasks 5.2-5.6, 8.3) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Episodes</Text>
        {episodesLoading ? (
          // Loading state for episodes (Task 5.3)
          <View style={styles.episodesLoading}>
            <ActivityIndicator size="small" color="#3b82f6" />
          </View>
        ) : episodes.length === 0 ? (
          // Empty episodes case (Task 5.4)
          <Text style={styles.emptyText}>No episodes available</Text>
        ) : (
          // Episodes list (Task 5.2, 5.6)
          episodes.map((episode) => (
            <EpisodeItem key={episode.id} episode={episode} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    maxWidth: 972,
    width: '100%',
    alignSelf: 'center',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  loadingText: {
    color: Colors.textSecondary,
    marginTop: Spacing.lg,
    fontSize: FontSize.sm,
  },
  errorTitle: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  errorMessage: {
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    fontSize: FontSize.sm,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: FontSize.sm,
  },
  header: {
    backgroundColor: Colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  characterImage: {
    width: '100%',
    maxWidth: 300,
    height: 320,
    backgroundColor: Colors.border,
  },
  headerContent: {
    padding: Spacing.xl,
  },
  characterName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  section: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  cardColumn: {
    width: '50%',
  },
  infoCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    margin: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoLabel: {
    fontSize: FontSize.sm,
    color: Colors.gray500,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  infoValue: {
    fontSize: FontSize.base,
    color: Colors.text,
    fontWeight: '600',
  },
  episodeItem: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  episodeName: {
    fontSize: FontSize.base,
    fontWeight: '600',
    color: Colors.text,
  },
  episodeNumber: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  episodeAirDate: {
    fontSize: FontSize.sm,
    color: Colors.gray500,
    marginTop: Spacing.xs,
  },
  episodesLoading: {
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    color: Colors.gray500,
    textAlign: 'center',
    paddingVertical: Spacing.xxl,
    fontSize: FontSize.sm,
  },
});
