# Rick and Morty App

A React Native mobile application built with Expo that displays characters, locations, and episodes from the [Rick and Morty API](https://rickandmortyapi.com/).

## Features

- 📱 Cross-platform (iOS & Android) using Expo
- 🔷 TypeScript for type safety
- 🧭 React Navigation for screen navigation
- 🐻 Zustand for state management
- 🌐 Axios for API integration
- ✨ ESLint & Prettier for code quality

## Prerequisites

- **Node.js**: v18 or higher
- **npm** or **yarn**
- **Expo Go** app installed on your mobile device (for testing)
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Getting Started

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd ricky-and-morthy-app
```

2. Install dependencies:

```bash
npm install
```

### Running the App

Start the Expo development server:

```bash
npm start
```

This will open Expo Dev Tools in your browser and display a QR code.

#### Testing on Your Device

1. Open the **Expo Go** app on your mobile device
2. Scan the QR code displayed in your terminal or browser
3. The app will load on your device

#### Testing on Emulator/Simulator

- **iOS**: Press `i` in the terminal (requires Xcode on macOS)
- **Android**: Press `a` in the terminal (requires Android Studio)
- **Web**: Press `w` in the terminal

## Project Structure

```
src/
├── api/              # API client and service layer
│   ├── client.ts     # Axios configuration
│   ├── rickMorty.ts  # Rick and Morty API endpoints
│   └── types.ts      # API response TypeScript types
├── components/       # Shared UI components
├── navigation/       # Navigation configuration
│   ├── index.tsx     # Root navigator
│   └── types.ts      # Navigation type definitions
├── screens/          # Screen components
│   └── HomeScreen.tsx
├── store/            # Zustand state management
│   └── index.ts      # App store
├── types/            # Shared TypeScript types
├── utils/            # Helper functions
└── App.tsx           # Root component
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## API Integration

The app uses the [Rick and Morty API](https://rickandmortyapi.com/) which provides:

- **Characters**: Information about Rick and Morty characters
- **Locations**: Different locations in the show
- **Episodes**: Episode details and air dates

### Example Usage

#### Fetching Characters (using Zustand store)

```typescript
import { useStore } from './store';

const MyComponent = () => {
  const { characters, loading, error, fetchCharacters } = useStore();

  useEffect(() => {
    fetchCharacters();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      {characters.map((char) => (
        <Text key={char.id}>{char.name}</Text>
      ))}
    </View>
  );
};
```

#### Direct API Call

```typescript
import { getCharacters, getCharacter } from './api/rickMorty';

// Get all characters
const characters = await getCharacters();

// Get a specific character
const character = await getCharacter(1);
```

## Navigation

The app uses React Navigation with TypeScript for type-safe routing.

### Example: Navigate to a Screen

```typescript
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from './navigation/types';

const MyComponent = () => {
  const navigation = useNavigation<RootStackNavigationProp<'Home'>>();

  const navigateToDetail = () => {
    navigation.navigate('Home');
  };

  return <Button title="Go Home" onPress={navigateToDetail} />;
};
```

## State Management

Zustand provides a simple hooks-based API for global state:

```typescript
import { useStore } from './store';

const MyComponent = () => {
  // Access state
  const characters = useStore((state) => state.characters);
  const loading = useStore((state) => state.loading);

  // Access actions
  const fetchCharacters = useStore((state) => state.fetchCharacters);
  const reset = useStore((state) => state.reset);

  return (
    <Button title="Load Characters" onPress={() => fetchCharacters()} />
  );
};
```

## Code Quality

- **ESLint**: Configured with TypeScript support
- **Prettier**: Standard formatting (2-space indent, single quotes)
- Run `npm run lint` before committing
- Run `npm run format` to auto-format code

## TypeScript

The project uses strict TypeScript configuration:

- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`

All API responses and navigation routes are fully typed for better developer experience and fewer runtime errors.

## License

MIT

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Rick and Morty API Docs](https://rickandmortyapi.com/documentation)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
