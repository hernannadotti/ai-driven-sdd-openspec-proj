import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { Character } from '@/api/types';

interface CharacterCardProps {
  character: Character;
  onPress?: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onPress,
}) => {
  const getStatusColor = (status: Character['status']) => {
    switch (status) {
      case 'Alive':
        return '#10b981'; // green-500
      case 'Dead':
        return '#ef4444'; // red-500
      default:
        return '#6b7280'; // gray-500
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      {/* Large Image */}
      <Image
        source={{ uri: character.image }}
        style={styles.image}
        resizeMode="cover"
      />
      {/* Status Indicator - Small dot */}
      <View
        style={[
          styles.statusDot,
          { backgroundColor: getStatusColor(character.status) },
        ]}
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Name */}
        <Text style={styles.name} numberOfLines={1}>
          {character.name}
        </Text>
        
        {/* Species (Role) */}
        <Text style={styles.species}>
          {character.species}
        </Text>

        {/* Location (Secondary info) */}
        <Text style={styles.location} numberOfLines={1}>
          {character.location.name}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    maxWidth: 300,
    aspectRatio: 1,
    backgroundColor: '#e5e7eb',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  statusDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  species: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    color: '#6b7280',
  },
});
