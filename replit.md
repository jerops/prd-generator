# PRD Generator App

## Overview

This is a React-based web application that guides users through creating Product Requirements Documents (PRDs) via an interactive, multi-step form interface. The app features a modern UI built with shadcn/ui components and generates downloadable markdown documents.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components based on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: PostgreSQL session store (connect-pg-simple)
- **API Style**: RESTful API with JSON responses

## Key Components

### Form System
- **Multi-step Form**: Six main sections (Overview, Problem, Solution, Features, Technical, Success)
- **Progressive Disclosure**: Section-by-section navigation with progress tracking
- **Validation**: Real-time validation using Zod schemas
- **State Persistence**: Form data preserved between sections

### UI Components
- **Navigation**: Tab-based section navigation with completion indicators
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Preview System**: Modal preview of generated PRD markdown
- **Export Functionality**: Download generated PRD as markdown file

### Data Management
- **Form Data Structure**: Comprehensive PRD schema covering all typical requirements
- **Database Schema**: Users and PRDs tables with JSON data storage
- **Session Storage**: User authentication and session management

## Data Flow

1. **User Input**: Multi-step form captures PRD requirements across six sections
2. **Real-time Validation**: Form data validated using Zod schemas on each input
3. **Progress Tracking**: Completion status calculated and displayed
4. **PRD Generation**: Form data transformed into structured markdown document
5. **Export/Save**: Users can preview, export, or save PRDs to database

## External Dependencies

### UI and Styling
- Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling
- Lucide React for consistent iconography
- Class Variance Authority for component variants

### Development Tools
- Vite with React plugin for fast development
- TypeScript for type safety
- PostCSS with Tailwind for CSS processing
- ESBuild for production bundling

### Database and Backend
- Neon Database for serverless PostgreSQL
- Drizzle ORM for type-safe database operations
- Express.js for API routing
- Connect-pg-simple for PostgreSQL session storage

## Deployment Strategy

The application uses a full-stack deployment approach:

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations in `migrations` directory

### Production Setup
- Single Node.js server serves both API and static files
- PostgreSQL database with connection pooling
- Session-based authentication with PostgreSQL storage
- Environment-based configuration for database connection

### Development Environment
- Vite dev server with HMR for frontend development
- Express server with middleware for API development
- Shared TypeScript configuration for client/server/shared code

## Changelog

```
Changelog:
- July 08, 2025. Initial setup
- July 08, 2025. UX improvements: Hidden next button on final section, auto-populate success metrics and completion criteria from core features
- July 08, 2025. Smart technical suggestions: Added intelligent auto-suggestions for platform selection, technology stack (React vs Vanilla JS), and technical requirements based on project context
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
UX feedback: Next button should be hidden (not disabled) on final section, auto-populate success metrics and completion criteria from features to reduce manual work
```