import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

// Define all routes and their parameters
export type RootStackParamList = {
  Home: undefined;
  CharacterList: undefined;
  CharacterProfile: { characterId: number };
  // Add more routes here as the app grows
  // Example:
  // LocationList: undefined;
  // EpisodeList: undefined;
};

// Export typed navigation prop for screens
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

// Export typed route prop for screens
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

// Declare global navigation types for type-safe navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
