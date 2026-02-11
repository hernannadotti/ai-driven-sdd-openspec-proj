## Purpose

This capability defines the navigation setup for the Rick and Morty React Native application using React Navigation v6. It covers navigation container initialization, stack navigator configuration, TypeScript navigation types, centralized navigation configuration, and type-safe navigation helpers to ensure compile-time safety for all navigation operations.

## Requirements

### Requirement: Navigation container initialization
The system SHALL set up React Navigation with a NavigationContainer at the app root.

#### Scenario: Navigation container wraps app
- **WHEN** the app initializes
- **THEN** NavigationContainer SHALL wrap the navigation structure in App.tsx

### Requirement: Stack navigator configuration
The system SHALL configure a native stack navigator for screen navigation.

#### Scenario: Stack navigator created
- **WHEN** setting up navigation
- **THEN** createNativeStackNavigator SHALL be used to create the navigator

### Requirement: TypeScript navigation types
The system SHALL define TypeScript types for navigation routes and parameters.

#### Scenario: Root stack param list defined
- **WHEN** navigating between screens
- **THEN** a RootStackParamList type SHALL define all route names and their parameters

#### Scenario: Navigation prop typed
- **WHEN** using navigation in screens
- **THEN** navigation prop SHALL be typed with NativeStackNavigationProp

#### Scenario: Route prop typed
- **WHEN** accessing route parameters
- **THEN** route prop SHALL be typed with RouteProp for type-safe parameter access

### Requirement: Navigation configuration file
The system SHALL provide a centralized navigation configuration in src/navigation/.

#### Scenario: Navigation types exported
- **WHEN** screens need navigation types
- **THEN** types.ts SHALL export all navigation type definitions

#### Scenario: Navigator component exported
- **WHEN** the app needs navigation structure
- **THEN** a root navigator component SHALL be exported from src/navigation/

### Requirement: Type-safe navigation helper
The system SHALL enable type-safe navigation throughout the application.

#### Scenario: Navigate with type checking
- **WHEN** calling navigation.navigate()
- **THEN** TypeScript SHALL enforce valid route names and required parameters

#### Scenario: Invalid route rejected
- **WHEN** attempting to navigate to an undefined route
- **THEN** TypeScript SHALL show a compilation error
