## Context

The app has a working scaffold with Expo, TypeScript, React Navigation, Zustand state management, and Rick and Morty API integration. Currently, there's only a Home screen with no functionality to display characters. We need to add a character list feature that displays characters in an attractive card-based grid layout inspired by Tailwind's "Team Sections with large images" pattern.

Current state: Navigation and API infrastructure exist, Zustand store has fetchCharacters action, but no UI to display character data.
Target state: Users can navigate to a character list screen showing characters in styled cards with images, names, status, species, and location.

## Goals / Non-Goals

**Goals:**
- Display Rick and Morty characters in a visually appealing card-based grid
- Use Tailwind-like styling through NativeWind for consistent cross-platform design
- Integrate with existing Zustand store for state management
- Implement efficient scrolling and image loading
- Create reusable components (CharacterCard and CharacterList)
- Add navigation from Home screen to Character List screen

**Non-Goals:**
- Character detail view (separate feature)
- Search/filter functionality (can be added later)
- Pagination controls (initial version loads first page only)
- Favoriting or user preferences
- Character comparison or advanced features

## Decisions

### 1. Styling Solution: NativeWind

**Decision**: Use NativeWind for styling

**Rationale**:
- Provides Tailwind CSS utility classes for React Native
- Cross-platform (iOS, Android, Web) consistency
- User requested Tailwind-inspired styling
- Zero runtime overhead (styles compiled at build time)
- Developer-friendly utility-first approach
- TypeScript support available

**Alternatives considered**:
- Styled Components: More runtime overhead, less familiar to Tailwind users
- Plain StyleSheet: More verbose, no Tailwind utilities
- React Native Paper: Material Design doesn't match Tailwind aesthetic

**Configuration needed**:
- Install `nativewind` and `tailwindcss`
- Create `tailwind.config.js` with React Native content paths
- Update `babel.config.js` to include NativeWind plugin
- Configure TypeScript for className IntelliSense

### 2. Component Architecture

**Decision**: Separate CharacterCard and CharacterList components

**Rationale**:
- **CharacterCard**: Presentational component, receives character data as props, handles card UI only
- **CharacterList**: Container component, handles data fetching, loading states, error handling, and rendering grid

**Benefits**:
- Single Responsibility Principle
- CharacterCard is reusable (could be used in search results, favorites, etc.)
- Easier to test in isolation
- Clear separation of concerns

**Component hierarchy**:
```
CharacterListScreen (navigation wrapper)
└── CharacterList (data fetching, state management)
    └── FlatList
        └── CharacterCard (presentation)
```

### 3. Layout Approach: FlatList with Grid

**Decision**: Use FlatList with `numColumns={2}` for grid layout

**Rationale**:
- FlatList provides built-in performance optimizations (virtualization, windowing)
- `numColumns` gives automatic grid layout
- Handles large lists efficiently
- Built-in pull-to-refresh capability
- Scroll performance optimized for React Native

**Alternatives considered**:
- ScrollView with manual grid: Poor performance with many items
- Third-party grid library: Unnecessary dependency, FlatList sufficient

### 4. State Management Integration

**Decision**: Use existing Zustand store's fetchCharacters action

**Rationale**:
- Store already implements fetchCharacters with loading/error states
- No need to duplicate logic
- Consistent state management across app
- Characters are global state (could be accessed from multiple screens)

**Usage pattern**:
```typescript
const { characters, loading, error, fetchCharacters } = useStore();
useEffect(() => { fetchCharacters(); }, []);
```

### 5. Image Handling

**Decision**: Use React Native's Image component with URI source

**Rationale**:
- Rick and Morty API provides direct image URLs
- Native Image component handles caching automatically
- Support for loading states with `onLoadStart`/`onLoadEnd`
- No additional library needed for basic use case

**Optimization**: Add `resizeMode="cover"` for consistent aspect ratios

**Future consideration**: If performance issues arise, consider react-native-fast-image

### 6. Card Design Pattern

**Decision**: Implement Tailwind "Team Sections - Large images" pattern adapted for React Native

**Key design elements**:
- **Large character image** at top (rounded corners)
- **Character name** (bold, larger text)
- **Status indicator** (colored badge: green=alive, red=dead, gray=unknown)
- **Species** and **Location** as secondary info
- **Card shadow/elevation** for depth
- **Consistent spacing** using Tailwind size scale (p-4, gap-2, etc.)

**NativeWind classes**:
- Container: `className="flex-1 bg-white rounded-lg shadow-md m-2 overflow-hidden"`
- Image: `className="w-full h-48 bg-gray-200"`
- Content: `className="p-4"`
- Name: `className="text-xl font-bold text-gray-900"`
- Status badge: `className="px-2 py-1 rounded-full text-xs font-semibold"`

### 7. Navigation Integration

**Decision**: Add CharacterList as a new stack screen, accessible from Home

**Rationale**:
- Fits existing navigation pattern (stack navigator)
- Simple navigation flow: Home → Character List
- Can later add: Character List → Character Detail
- Maintains back button functionality

**Implementation**:
- Add `CharacterList: undefined` to RootStackParamList
- Add Button on HomeScreen to navigate
- Register CharacterListScreen in Stack.Navigator

### 8. Error and Loading States

**Decision**: Show states within CharacterList component

**Loading**: Centered ActivityIndicator with NativeWind styling
**Error**: Error message with retry button
**Empty**: "No characters found" message

**Rationale**: Inline states better UX than full-screen modals

## Risks / Trade-offs

### [Risk] NativeWind learning curve
**Mitigation**: Well-documented library with examples. Team already familiar with Tailwind concepts from web development.

### [Risk] NativeWind build time increase
**Trade-off**: Slight build time increase due to Tailwind processing
**Mitigation**: Acceptable trade-off for developer experience and styling consistency. Can optimize with content paths in tailwind.config.js.

### [Risk] Image loading performance with many characters
**Mitigation**: FlatList virtualization helps. If issues arise, can add react-native-fast-image or implement progressive image loading.

### [Risk] Grid layout on different screen sizes
**Mitigation**: NativeWind responsive classes can be added later. Initial 2-column grid works well on most phones. Can make responsive: `sm:numColumns={2} lg:numColumns={3}`.

### [Trade-off] Using existing store vs component-level state
**Trade-off**: Global state means all components share same character data
**Benefit**: Reduces API calls, faster navigation, consistent data
**Consideration**: If we later need different character filters per screen, may need to refactor

### [Trade-off] No pagination initially
**Trade-off**: Only shows first page of characters (~20 characters)
**Mitigation**: Sufficient for MVP. Can add pagination or infinite scroll later using Rick and Morty API's pagination support.

## Migration Plan

N/A - This is a new feature, not a migration.

## Open Questions

None - design is complete and ready for implementation.
