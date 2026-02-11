## ADDED Requirements

### Requirement: Zustand store integration
The system SHALL use the existing Zustand store to access characters, loading, and error states.

#### Scenario: Store hook usage
- **WHEN** component mounts
- **THEN** useStore hook SHALL be called to access characters, loading, error, and fetchCharacters

#### Scenario: State reactivity
- **WHEN** store state changes
- **THEN** component SHALL automatically re-render with updated data

### Requirement: Character data fetching
The system SHALL fetch characters from the Rick and Morty API when component mounts.

#### Scenario: Initial fetch
- **WHEN** component mounts
- **THEN** fetchCharacters action SHALL be called automatically

#### Scenario: Fetch only once
- **WHEN** component is already mounted
- **THEN** fetchCharacters SHALL not be called again on re-renders

### Requirement: Loading state display
The system SHALL show a loading indicator while characters are being fetched.

#### Scenario: Loading indicator shown
- **WHEN** loading state is true
- **THEN** ActivityIndicator SHALL be displayed centered on screen

#### Scenario: Loading text
- **WHEN** loading indicator is shown
- **THEN** "Loading characters..." text SHALL be displayed below indicator

#### Scenario: Loading replaced by content
- **WHEN** loading completes
- **THEN** loading indicator SHALL be replaced with character list

### Requirement: Error state display
The system SHALL display error messages when API calls fail.

#### Scenario: Error message shown
- **WHEN** error state is not null
- **THEN** error message SHALL be displayed to user

#### Scenario: Retry button
- **WHEN** error is displayed
- **THEN** "Retry" button SHALL be provided to attempt fetch again

#### Scenario: Retry action
- **WHEN** user presses retry button
- **THEN** fetchCharacters SHALL be called again and error cleared

### Requirement: Empty state display
The system SHALL handle the case when no characters are returned.

#### Scenario: No characters message
- **WHEN** characters array is empty and not loading
- **THEN** "No characters found" message SHALL be displayed

### Requirement: Grid layout with FlatList
The system SHALL render characters in a 2-column grid using FlatList.

#### Scenario: FlatList configuration
- **WHEN** characters are displayed
- **THEN** FlatList SHALL be used with numColumns set to 2

#### Scenario: Virtualization
- **WHEN** rendering many characters
- **THEN** FlatList SHALL virtualize items for performance

#### Scenario: Key extraction
- **WHEN** rendering list items
- **THEN** character ID SHALL be used as unique key for each item

### Requirement: CharacterCard rendering
The system SHALL render each character using the CharacterCard component.

#### Scenario: Card rendering
- **WHEN** FlatList renders an item
- **THEN** CharacterCard component SHALL be rendered with character data as prop

#### Scenario: Grid spacing
- **WHEN** cards are displayed in grid
- **THEN** consistent spacing SHALL be maintained between cards

### Requirement: List styling
The system SHALL apply appropriate container styling with NativeWind.

#### Scenario: Container background
- **WHEN** list is rendered
- **THEN** container SHALL have light background color

#### Scenario: Content padding
- **WHEN** list is displayed
- **THEN** container SHALL have padding around edges using NativeWind classes

### Requirement: Scroll performance
The system SHALL maintain smooth scrolling even with many characters.

#### Scenario: Scroll optimization
- **WHEN** user scrolls through list
- **THEN** scrolling SHALL be smooth without lag

#### Scenario: Image loading optimization
- **WHEN** images load in cards
- **THEN** scrolling SHALL not be blocked or janky
