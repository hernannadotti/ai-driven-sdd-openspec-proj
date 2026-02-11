## 1. Setup NativeWind

- [x] 1.1 Install nativewind and tailwindcss packages with peer dependencies
- [x] 1.2 Create tailwind.config.js at project root with React Native preset
- [x] 1.3 Configure content paths in tailwind.config.js to include all src/**/*.{ts,tsx} files
- [x] 1.4 Update babel.config.js to include 'nativewind/babel' plugin
- [x] 1.5 Create or update nativewind-env.d.ts for TypeScript className support
- [x] 1.6 Verify TypeScript recognizes className prop without errors

## 2. Create CharacterCard Component

- [x] 2.1 Create src/components/CharacterCard.tsx file
- [x] 2.2 Define CharacterCardProps interface accepting Character type
- [x] 2.3 Implement card container with NativeWind classes (flex, bg, rounded, shadow)
- [x] 2.4 Add character image display with rounded top corners and fixed height
- [x] 2.5 Add character name display with large bold text and truncation
- [x] 2.6 Implement status badge with conditional colors (green for Alive, red for Dead, gray for Unknown)
- [x] 2.7 Add species text display with smaller gray styling
- [x] 2.8 Add location name display with smaller gray styling
- [x] 2.9 Wrap card in Pressable/TouchableOpacity for press feedback
- [x] 2.10 Export CharacterCard component

## 3. Create CharacterList Component

- [x] 3.1 Create src/components/CharacterList.tsx file
- [x] 3.2 Import and use useStore hook to access characters, loading, error, fetchCharacters
- [x] 3.3 Implement useEffect to call fetchCharacters on component mount
- [x] 3.4 Add loading state UI with ActivityIndicator and "Loading characters..." text
- [x] 3.5 Add error state UI with error message and retry button
- [x] 3.6 Add retry button handler that calls fetchCharacters
- [x] 3.7 Add empty state UI for when characters array is empty
- [x] 3.8 Implement FlatList with numColumns={2} for grid layout
- [x] 3.9 Configure FlatList keyExtractor to use character.id
- [x] 3.10 Configure FlatList renderItem to render CharacterCard with character data
- [x] 3.11 Add container styling with light background and padding using NativeWind
- [x] 3.12 Add column wrapper styling for proper grid spacing
- [x] 3.13 Export CharacterList component

## 4. Create CharacterListScreen

- [x] 4.1 Create src/screens/CharacterListScreen.tsx file
- [x] 4.2 Import CharacterList component
- [x] 4.3 Create functional component with proper screen container
- [x] 4.4 Add SafeAreaView wrapper for iOS safe area handling
- [x] 4.5 Render CharacterList component inside screen container
- [x] 4.6 Add navigation prop typing with RootStackNavigationProp
- [x] 4.7 Export CharacterListScreen component

## 5. Update Navigation

- [x] 5.1 Update src/navigation/types.ts to add CharacterList route to RootStackParamList
- [x] 5.2 Update src/navigation/index.tsx to import CharacterListScreen
- [x] 5.3 Add Stack.Screen for CharacterList with "Characters" title
- [x] 5.4 Update src/screens/HomeScreen.tsx to add navigation button
- [x] 5.5 Style navigation button with NativeWind classes for visibility
- [x] 5.6 Add onPress handler to navigate to CharacterList screen
- [x] 5.7 Verify TypeScript navigation types work correctly

## 6. Verification

- [x] 6.1 Run TypeScript type check (npm run type-check)
- [x] 6.2 Run ESLint (npm run lint)
- [ ] 6.3 Start development server (npx expo start)
- [ ] 6.4 Test navigation from Home to CharacterList screen
- [ ] 6.5 Verify character list loads and displays in 2-column grid
- [ ] 6.6 Verify character cards show image, name, status badge, species, location
- [ ] 6.7 Test error state by simulating network failure
- [ ] 6.8 Test retry button functionality
- [ ] 6.9 Verify loading state displays correctly
- [ ] 6.10 Test card press feedback (opacity/highlight change)
- [ ] 6.11 Verify back navigation works from CharacterList to Home
- [ ] 6.12 Test on iOS simulator/device
- [ ] 6.13 Test on Android simulator/device
- [ ] 6.14 Test on web browser
