## Context

The Rick and Morty app currently displays a list of characters using the CharacterList screen and CharacterCard components. Users can browse characters but cannot access detailed information about individual characters. 

**Current Architecture:**
- React Native with Expo (~54.0)
- React Navigation v7 with Native Stack Navigator
- NativeWind/Tailwind CSS for styling
- Zustand for state management
- Rick and Morty API for data fetching
- TypeScript for type safety

**Current Navigation Flow:**
Home → CharacterList (displays grid of CharacterCard components)

**Constraints:**
- Must maintain existing navigation patterns and type safety
- Must use NativeWind/Tailwind for consistency with existing UI
- Character data is already typed in `src/api/types.ts`
- CharacterCard already has an onPress prop ready for navigation

## Goals / Non-Goals

**Goals:**
- Enable navigation from character list to a detailed profile screen
- Display comprehensive character information (image, status, species, origin, location, episodes)
- Implement Flowbite-inspired UI design patterns adapted for React Native
- Maintain type-safe navigation throughout the app
- Handle loading and error states gracefully
- Reuse existing API client and data structures

**Non-Goals:**
- Editing or modifying character data (read-only view)
- Social features (sharing, favorites, comments)
- Episode detail screens (character profile will link to episodes but not show full episode details)
- Offline caching or local storage (use existing patterns)
- Animation between list and profile (keep navigation simple)

## Decisions

### 1. Navigation Parameter Strategy

**Decision:** Pass character ID as route parameter, not the full character object.

**Rationale:**
- Character objects are large (~20 fields including arrays)
- Deep linking and URL sharing work better with simple parameters
- Refetching ensures data freshness on profile screen
- Follows best practice for React Navigation parameter passing

**Alternative Considered:** Pass full character object
- ❌ Poor deep linking support
- ❌ Stale data if character is updated
- ❌ Larger navigation state

**Implementation:**
```typescript
// Navigation type
CharacterProfile: { characterId: number };

// Navigate with ID
navigation.navigate('CharacterProfile', { characterId: character.id });
```

### 2. Data Fetching Strategy

**Decision:** Fetch full character details on mount, including episode data enrichment.

**Rationale:**
- Character endpoint returns episode URLs as string array
- Need to fetch episode details to show episode names/dates
- Batch episode requests for better performance
- Show loading state during fetch

**Alternative Considered:** Use character object from list
- ❌ Episode arrays only contain URLs, not episode details
- ❌ Stale data concerns
- ✅ Faster initial render (considered acceptable trade-off)

**Implementation:**
```typescript
// 1. Fetch character by ID from route params
// 2. Extract episode URLs from character.episode[]
// 3. Batch fetch episode details (limit to first 10 for performance)
// 4. Combine data for rendering
```

### 3. UI Layout Structure

**Decision:** Implement Flowbite user profile pattern with React Native adaptations.

**Components:**
- **Profile Header:** Large character image, name, status badge
- **Info Cards:** Species, gender, origin, location in grid layout
- **Episodes Section:** Scrollable list of episodes the character appears in
- **Stats Row:** Status indicator with colored badge

**Adaptations from Flowbite Web to React Native:**
- Use React Native View/Text instead of div/p
- Replace CSS Grid with FlexBox (NativeWind's flex utilities)
- Use FlatList for episode list instead of HTML list
- Adapt card shadows using React Native shadow props
- Replace hover states with Pressable opacity feedback

**Design Reference:** https://flowbite.com/application-ui/demo/users/profile/
- Header section with avatar and info
- Grid of information cards
- List sections for related data

### 4. Error Handling

**Decision:** Implement three-state UI pattern (loading, error, success).

**States:**
- **Loading:** Show skeleton/spinner while fetching character data
- **Error:** Show error message with retry button if character fetch fails
- **Success:** Display full profile

**Rationale:**
- Character might not exist (404)
- Network failures should be recoverable
- Clear user feedback improves UX

### 5. Component Structure

**Decision:** Create single CharacterProfileScreen component with local state.

**Rationale:**
- Profile is self-contained screen, doesn't need shared state
- React hooks (useState, useEffect) sufficient for data fetching
- Keeps component simple and maintainable

**Alternative Considered:** Extract profile data to Zustand store
- ❌ Overkill for single-screen data
- ❌ Adds complexity without benefit
- Non-goal: Profile data doesn't need global access

## Risks / Trade-offs

**[Risk]** Episode fetching could be slow with many episodes  
**Mitigation:** Limit to first 10 episodes, add "View More" link for future enhancement

**[Risk]** Character images may fail to load  
**Mitigation:** Add fallback placeholder image and error handling in Image component

**[Risk]** Deep linking to invalid character ID  
**Mitigation:** Implement error state that shows "Character not found" with back button

**[Trade-off]** Refetching character data vs. passing from list  
- ✅ Data freshness and deep linking support
- ❌ Slight delay on screen load
- **Accepted:** UX improvement worth minimal performance cost

**[Trade-off]** Flowbite web patterns adapted to mobile  
- ✅ Professional, consistent design language
- ❌ Some patterns need significant adaptation
- **Accepted:** Design patterns are guidelines, not strict requirements
