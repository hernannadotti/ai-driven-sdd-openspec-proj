# AI Agents Orchestration for Spec-Driven Development

## Overview

This project demonstrates an AI-driven development approach where multiple specialized agents collaborate to build a React Native application from OpenAPI specifications and design requirements.

## Architecture

### Core Principle
Agents consume structured specifications (OpenAPI, schemas, design systems) and autonomously generate production-ready code following best practices and project conventions.

### Agent Roles

#### 1. **Spec Analyzer Agent**
- **Input**: OpenAPI/Swagger specifications, JSON schemas
- **Output**: Parsed API structure, endpoint definitions, data models
- **Responsibilities**:
  - Validate specification syntax and completeness
  - Extract endpoints, request/response schemas, authentication requirements
  - Identify relationships between entities
  - Generate TypeScript type definitions from schemas

#### 2. **API Client Generator Agent**
- **Input**: Parsed API specifications, project configuration
- **Output**: Type-safe API client code (`src/api/`)
- **Responsibilities**:
  - Create Axios client instances with base configuration
  - Generate typed API methods for each endpoint
  - Implement error handling and retry logic
  - Add request/response interceptors

#### 3. **State Management Agent**
- **Input**: API types, application requirements
- **Output**: Zustand store definitions (`src/store/`)
- **Responsibilities**:
  - Design state structure based on data models
  - Create actions for CRUD operations
  - Implement caching and optimistic updates
  - Generate selectors for computed state

#### 4. **UI Component Agent**
- **Input**: Data models, design system specifications
- **Output**: React components (`src/components/`, `src/screens/`)
- **Responsibilities**:
  - Generate presentational components (CharacterCard, CharacterList)
  - Create screen-level components with data fetching
  - Apply styling using NativeWind/Tailwind
  - Implement loading states and error boundaries

#### 5. **Navigation Agent**
- **Input**: Screen structure, user flow requirements
- **Output**: Navigation configuration (`src/navigation/`)
- **Responsibilities**:
  - Configure React Navigation stack
  - Define route parameters with TypeScript types
  - Set up deep linking
  - Handle navigation state persistence

#### 6. **Integration Agent** (Orchestrator)
- **Input**: All agent outputs, project dependencies
- **Output**: Fully integrated application
- **Responsibilities**:
  - Coordinate agent execution order
  - Resolve inter-agent dependencies
  - Validate cross-cutting concerns (types, imports)
  - Run linting and type checking
  - Generate project documentation

## Orchestration Flow

```
1. Specification Ingestion
   └─> Spec Analyzer parses OpenAPI spec
       └─> Generates TypeScript interfaces in src/api/types.ts

2. API Layer Generation
   └─> API Client Generator reads types
       └─> Creates src/api/client.ts and src/api/rickMorty.ts
       └─> Implements typed methods: getCharacters(), getCharacter(id)

3. State Layer Creation
   └─> State Management Agent analyzes API methods
       └─> Generates Zustand stores in src/store/
       └─> Adds caching, loading states, error handling

4. UI Component Generation
   └─> UI Component Agent receives data types
       └─> Creates components: CharacterCard, CharacterList
       └─> Builds screens: HomeScreen, CharacterListScreen, CharacterProfileScreen
       └─> Applies NativeWind styling based on design specs

5. Navigation Setup
   └─> Navigation Agent maps screens to routes
       └─> Configures stack navigator with typed params
       └─> Sets up navigation types in src/navigation/types.ts

6. Integration & Validation
   └─> Integration Agent connects all layers
       └─> Validates TypeScript compilation
       └─> Runs ESLint checks
       └─> Generates README with setup instructions
       └─> Creates this AGENTS.md documentation
```

## Working with Specifications

### OpenAPI Spec Processing
Agents expect OpenAPI 3.0+ specifications with:
- Clear operation IDs for method naming
- Comprehensive schema definitions for type generation
- Tagged operations for logical grouping
- Examples for mock data generation

### Design System Integration
UI agents consume design tokens:
```json
{
  "colors": { "primary": "#9B59B6", "secondary": "#3498DB" },
  "spacing": { "sm": "8px", "md": "16px", "lg": "24px" },
  "typography": { "heading": "700 24px", "body": "400 16px" }
}
```

### Type Safety Chain
```
OpenAPI Schema → TypeScript Types → API Client → Store → Components
```
Every layer maintains type safety propagated from the specification.

## Agent Communication

Agents communicate via:
- **Shared Context**: Project configuration, file system state
- **Event System**: Progress updates, error notifications
- **Validation Gates**: Each agent validates inputs before proceeding
- **Rollback Mechanism**: Failed steps trigger cleanup

## Customization Rules

Agents follow project-specific conventions defined in:
- `tsconfig.json` - TypeScript compiler settings
- `eslint.config.mjs` - Code style rules
- `tailwind.config.js` - Design system configuration
- `package.json` - Dependencies and scripts

## Benefits

✅ **Consistency**: All code follows the same patterns and conventions  
✅ **Speed**: Minutes instead of hours for boilerplate generation  
✅ **Accuracy**: Direct spec-to-code ensures API contract compliance  
✅ **Maintainability**: Changes to specs automatically propagate through layers  
✅ **Documentation**: Self-documenting code with types matching spec  

## Limitations

- Requires well-defined specifications
- Complex business logic still needs human implementation
- UI/UX design decisions require human oversight
- Initial agent configuration needs project context
