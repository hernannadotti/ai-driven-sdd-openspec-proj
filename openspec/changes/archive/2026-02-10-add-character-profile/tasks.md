# Implementation Tasks

## 1. Navigation Setup

- [x] 1.1 Add `CharacterProfile: { characterId: number }` to RootStackParamList in `src/navigation/types.ts`
- [x] 1.2 Create `src/screens/CharacterProfileScreen.tsx` file with basic component export
- [x] 1.3 Register CharacterProfile route in the Stack Navigator in `src/navigation/index.tsx`
- [ ] 1.4 Configure deep linking for character profile route (optional, can defer)

## 2. Data Fetching Logic

- [x] 2.1 Add `getCharacterById(id: number)` function to `src/api/rickMorty.ts` if not present
- [x] 2.2 Add `getEpisodesByIds(ids: number[])` batch fetch function to `src/api/rickMorty.ts`
- [x] 2.3 Implement character data fetching in CharacterProfileScreen using `useEffect` on mount
- [x] 2.4 Extract episode IDs from character.episode URLs and batch fetch first 10 episodes
- [x] 2.5 Add loading, error, and success state management with `useState`
- [x] 2.6 Implement error handling for character not found (404) and network errors
- [x] 2.7 Add retry mechanism for failed data fetches

## 3. Profile Header UI

- [x] 3.1 Create character image display with large centered layout
- [x] 3.2 Add image fallback/placeholder for failed image loads
- [x] 3.3 Create character name heading with prominent typography
- [x] 3.4 Create status badge component with color coding (green=Alive, red=Dead, gray=Unknown)
- [x] 3.5 Apply Flowbite header styling with proper spacing and hierarchy

## 4. Information Cards UI

- [x] 4.1 Create reusable InfoCard component with label and value props
- [x] 4.2 Implement responsive grid layout (2 columns on mobile) using NativeWind flex utilities
- [x] 4.3 Add info cards for species, gender, origin.name, and location.name
- [x] 4.4 Handle missing/unknown values with "Unknown" placeholder text
- [x] 4.5 Apply Flowbite card styling (rounded corners, shadows, padding, consistent spacing)

## 5. Episodes List UI

- [x] 5.1 Create EpisodeItem component displaying episode number, name, and air date
- [x] 5.2 Implement scrollable episode list using FlatList
- [x] 5.3 Add loading skeleton/spinner for episodes section while fetching
- [x] 5.4 Handle empty episodes case with "No episodes available" message
- [x] 5.5 Display only first 10 episodes as per design decision
- [x] 5.6 Apply Flowbite list item styling with proper spacing

## 6. Loading & Error States

- [x] 6.1 Create loading state UI with skeleton or spinner for full screen
- [x] 6.2 Create error state UI with error message and retry button
- [x] 6.3 Create "Character not found" error variant with back navigation button
- [x] 6.4 Ensure loading state displays while initial character data is fetching
- [x] 6.5 Test transitions between loading → success and loading → error states

## 7. Navigation Integration

- [x] 7.1 Add navigation handler to CharacterCard's onPress prop in `src/components/CharacterCard.tsx`
- [x] 7.2 Pass `characterId` parameter when navigating to CharacterProfile
- [x] 7.3 Add visual feedback (opacity change) to CharacterCard using Pressable
- [x] 7.4 Verify TypeScript type safety for navigation parameters

## 8. Styling & Responsive Layout

- [x] 8.1 Implement typography hierarchy (heading, subheading, body) per Flowbite patterns
- [x] 8.2 Apply semantic color coding throughout (status badges, text, backgrounds)
- [x] 8.3 Ensure consistent spacing and padding matching Flowbite design system
- [x] 8.4 Verify layout adapts to different screen sizes (portrait/landscape)
- [x] 8.5 Add ScrollView wrapper to ensure all content is accessible on smaller screens

## 9. Testing & Validation

- [x] 9.1 Test navigation from CharacterList to CharacterProfile with valid character ID
- [x] 9.2 Test character profile renders correctly with all sections (header, info cards, episodes)
- [x] 9.3 Test error handling with invalid character ID (404 scenario)
- [x] 9.4 Test network error scenario and retry functionality
- [x] 9.5 Test back navigation preserves CharacterList scroll position
- [x] 9.6 Test image load failure shows placeholder correctly
- [x] 9.7 Test episode fetching with characters that have <10 and >10 episodes
- [ ] 9.8 Verify deep linking works if implemented (optional)
- [x] 9.9 Test on Android emulator and verify no console errors
- [x] 9.10 Verify UI matches Flowbite design patterns and is visually consistent
