import React from 'react';
import { SafeAreaView } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CharacterList } from '@/components/CharacterList';
import type { RootStackParamList } from '@/navigation/types';

type CharacterListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CharacterList'
>;

interface CharacterListScreenProps {
  navigation: CharacterListScreenNavigationProp;
}

export const CharacterListScreen: React.FC<CharacterListScreenProps> = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CharacterList />
    </SafeAreaView>
  );
};
