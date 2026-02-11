## Purpose

This capability defines navigation behavior for accessing character profile details in the Rick and Morty app. It covers navigation triggers, route configuration, deep linking support, and state preservation during navigation flows.

## Requirements

### Requirement: Character card navigation trigger

The CharacterCard component SHALL provide a tappable interface that navigates to the character profile screen when pressed.

#### Scenario: User taps character card

- **WHEN** user taps on a character card in the character list
- **THEN** the app SHALL navigate to the CharacterProfile screen
- **AND** SHALL pass the character ID as a route parameter

#### Scenario: Visual feedback on tap

- **WHEN** user presses down on a character card
- **THEN** the card SHALL provide visual feedback (opacity change or scale)
- **AND** SHALL return to normal state when released

### Requirement: Navigation route registration

The navigation stack SHALL include a CharacterProfile route that accepts a character ID parameter.

#### Scenario: Route is registered in navigator

- **WHEN** the app initializes
- **THEN** the navigation stack SHALL include a "CharacterProfile" route
- **AND** the route SHALL accept a required parameter "characterId" of type number

#### Scenario: Type-safe navigation

- **WHEN** navigating to CharacterProfile
- **THEN** TypeScript SHALL enforce that characterId parameter is provided
- **AND** SHALL enforce that characterId is a number type

### Requirement: Deep linking support

The CharacterProfile route SHALL support deep linking with character ID in the URL.

#### Scenario: Opening deep link

- **WHEN** app receives a deep link to a character profile (e.g., "app://character/42")
- **THEN** the app SHALL parse the character ID from the URL
- **AND** SHALL navigate to CharacterProfile screen with the correct characterId parameter

#### Scenario: Invalid character ID in deep link

- **WHEN** app receives a deep link with non-numeric character ID
- **THEN** the app SHALL handle the error gracefully
- **AND** SHALL display an error message or navigate to a fallback screen

### Requirement: Navigation state preservation

The navigation state SHALL preserve the character ID when navigating back and forth.

#### Scenario: Back navigation

- **WHEN** user navigates from CharacterProfile back to CharacterList
- **THEN** the CharacterList SHALL maintain its scroll position and state
- **AND** user SHALL be able to navigate to the same or different character again

#### Scenario: Forward navigation after back

- **WHEN** user navigates back to CharacterList and then taps a different character
- **THEN** the app SHALL navigate to the new character's profile
- **AND** SHALL use the new character's ID
