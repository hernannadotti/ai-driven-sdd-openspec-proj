import React, { useEffect, useState } from 'react';
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
        return { backgroundColor: '#d1fae5', borderColor: '#a7f3d0' };
      case 'Dead':
        return { backgroundColor: '#fee2e2', borderColor: '#fecaca' };
      default:
        return { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' };
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'Alive':
        return '#065f46';
      case 'Dead':
        return '#991b1b';
      default:
        return '#1f2937';
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

  // Retry mechanism (Task 2.7)
  const fetchCharacterData = async () => {
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
    } catch (err: any) {
      // Error handling (Task 2.6)
      if (err.response?.status === 404) {
        setLoadingState('not-found');
        setError('Character not found');
      } else {
        setLoadingState('error');
        setError(err.message || 'Failed to load character data');
      }
    }
  };

  useEffect(() => {
    fetchCharacterData();
  }, [characterId]);

  // Loading state UI (Task 6.1, 6.4)
  if (loadingState === 'loading') {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
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
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    color: '#4b5563',
    marginTop: 16,
    fontSize: 14,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  header: {
    backgroundColor: '#ffffff',
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
    backgroundColor: '#e5e7eb',
  },
  headerContent: {
    padding: 24,
  },
  characterName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  cardColumn: {
    width: '50%',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  episodeItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  episodeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  episodeNumber: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
  },
  episodeAirDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  episodesLoading: {
    paddingVertical: 32,
  },
  emptyText: {
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 32,
    fontSize: 14,
  },
});
