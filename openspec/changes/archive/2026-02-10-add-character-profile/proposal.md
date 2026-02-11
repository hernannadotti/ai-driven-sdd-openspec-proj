## Why

Users currently can view a list of Rick and Morty characters but cannot access detailed information about individual characters. Adding a character profile screen enables users to explore character details, episodes, and additional metadata when they tap on a character card.

## What Changes

- Add a new `CharacterProfileScreen` component to display detailed character information
- Add a navigation route from `CharacterListScreen` to `CharacterProfileScreen` 
- Make character cards in `CharacterCard` component tappable/clickable to navigate to the profile
- Fetch and display comprehensive character data (episodes, origin, location, status, species, etc.)
- Style the profile screen using Flowbite UI patterns from their user profile demo
- Implement loading and error states for character profile data fetching

## Capabilities

### New Capabilities

- `character-profile-navigation`: Enable navigation from character list to individual character profile screens, passing character data between screens
- `character-profile-ui`: Display detailed character information in a well-designed profile layout using Flowbite design patterns, including character image, bio, stats, episodes, and related information

### Modified Capabilities

<!-- No existing capabilities are being modified -->

## Impact

**Affected Code**:
- `src/components/CharacterCard.tsx` - Add onPress handler for navigation
- `src/navigation/index.tsx` - Add CharacterProfile route
- `src/navigation/types.ts` - Add CharacterProfile screen type definition
- New file: `src/screens/CharacterProfileScreen.tsx`

**API Integration**:
- Use existing Rick and Morty API client to fetch character details
- May need to fetch additional episode data for character's episode list

**Dependencies**:
- Continue using existing navigation library (@react-navigation/native-stack)
- Continue using existing styling approach (NativeWind/Tailwind CSS)
- Flowbite UI patterns will be implemented using React Native components styled with Tailwind classes

**UX Impact**:
- Users gain ability to explore individual character details
- Improved user engagement through deeper content exploration
- Better information hierarchy and discoverability
