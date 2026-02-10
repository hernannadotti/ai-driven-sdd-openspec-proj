import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { CharacterListScreen } from '../screens/CharacterListScreen';
import { CharacterProfileScreen } from '../screens/CharacterProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Rick and Morty' }}
        />
        <Stack.Screen
          name="CharacterList"
          component={CharacterListScreen}
          options={{ title: 'Characters' }}
        />
        <Stack.Screen
          name="CharacterProfile"
          component={CharacterProfileScreen}
          options={{ title: 'Character Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
