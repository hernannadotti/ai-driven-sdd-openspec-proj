## Purpose

This capability defines the requirements for a reusable CharacterCard component that displays individual character information from the Rick and Morty API in a visually appealing card format. The component handles character data display including image, name, status badge, species, and location, with appropriate styling and touch interaction support.

## Requirements

### Requirement: Character data props
The system SHALL accept a Character object as a prop containing all necessary display data.

#### Scenario: Character prop received
- **WHEN** CharacterCard is rendered
- **THEN** component SHALL receive a Character object with id, name, image, status, species, and location properties

#### Scenario: Required fields validation
- **WHEN** Character prop is missing required fields
- **THEN** component SHALL handle gracefully with fallback values

### Requirement: Card container styling
The system SHALL render a card container with NativeWind utility classes for consistent appearance.

#### Scenario: Card layout
- **WHEN** card is rendered
- **THEN** container SHALL use className with flex, background, rounded corners, shadow, and margin classes

#### Scenario: Card dimensions
- **WHEN** displayed in grid
- **THEN** card SHALL fill half the screen width minus margins for 2-column layout

#### Scenario: Card elevation
- **WHEN** card is displayed
- **THEN** card SHALL have shadow/elevation for depth effect

### Requirement: Character image display
The system SHALL display the character image from the API URL.

#### Scenario: Image rendering
- **WHEN** character has valid image URL
- **THEN** Image component SHALL display character image at top of card

#### Scenario: Image dimensions
- **WHEN** image is rendered
- **THEN** image SHALL have fixed height and full width with cover resize mode

#### Scenario: Rounded corners
- **WHEN** image is displayed
- **THEN** image SHALL have rounded top corners matching card style

#### Scenario: Loading placeholder
- **WHEN** image is loading
- **THEN** component SHALL show gray background placeholder

### Requirement: Character name display
The system SHALL display the character name prominently.

#### Scenario: Name text style
- **WHEN** card is rendered
- **THEN** name SHALL be displayed in large bold text using NativeWind classes

#### Scenario: Name truncation
- **WHEN** name is very long
- **THEN** text SHALL truncate with ellipsis to prevent overflow

### Requirement: Status badge display
The system SHALL display a colored status badge indicating if character is alive, dead, or unknown.

#### Scenario: Alive status
- **WHEN** character status is "Alive"
- **THEN** badge SHALL display with green background and "Alive" text

#### Scenario: Dead status
- **WHEN** character status is "Dead"
- **THEN** badge SHALL display with red background and "Dead" text

#### Scenario: Unknown status
- **WHEN** character status is "unknown"
- **THEN** badge SHALL display with gray background and "Unknown" text

#### Scenario: Badge styling
- **WHEN** status badge is rendered
- **THEN** badge SHALL use rounded-full, small padding, and small font size NativeWind classes

### Requirement: Species and location display
The system SHALL display character species and last known location as secondary information.

#### Scenario: Species text
- **WHEN** card is rendered
- **THEN** species SHALL be displayed in smaller gray text below name

#### Scenario: Location text
- **WHEN** card is rendered
- **THEN** location name SHALL be displayed in smaller gray text below species

#### Scenario: Info spacing
- **WHEN** displaying text elements
- **THEN** consistent spacing SHALL be maintained using NativeWind gap/margin classes

### Requirement: Touch interaction
The system SHALL be touchable for future navigation to detail view.

#### Scenario: Pressable wrapper
- **WHEN** card is rendered
- **THEN** entire card SHALL be wrapped in Pressable or TouchableOpacity

#### Scenario: Press feedback
- **WHEN** user presses card
- **THEN** visual feedback SHALL be provided (opacity change or highlight)
