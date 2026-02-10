import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { Character } from '@/api/types';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';

interface CharacterCardProps {
  character: Character;
  onPress?: () => void;
}

const CharacterCardComponent: React.FC<CharacterCardProps> = ({
  character,
  onPress,
}) => {
  const getStatusColor = (status: Character['status']) => {
    switch (status) {
      case 'Alive':
        return Colors.success;
      case 'Dead':
        return Colors.error;
      default:
        return Colors.gray500;
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

// Wrap in React.memo for performance optimization
export const CharacterCard = React.memo(
  CharacterCardComponent,
  (prevProps, nextProps) =>
    prevProps.character.id === nextProps.character.id &&
    prevProps.onPress === nextProps.onPress
);

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
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
    backgroundColor: Colors.border,
    borderTopLeftRadius: BorderRadius.md,
    borderTopRightRadius: BorderRadius.md,
  },
  statusDot: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  content: {
    padding: Spacing.lg,
  },
  name: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  species: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  location: {
    fontSize: FontSize.xs,
    color: Colors.gray500,
  },
});
