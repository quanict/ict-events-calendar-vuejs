# AI Agent Instructions for ict-events-calendar-vuejs

## Project Overview

This is a Vue 3 + TypeScript project that serves two main purposes based on configuration:
- Calendar Application (`APP_TYPE=calendar`)
- Gallery Application (`APP_TYPE=gallery`)

## Key Architecture Points

### Application Structure
- **Configuration Management**: Configuration files in `src/configs/` control app behavior
  - `app.ts`: Core app settings and type (calendar/gallery)
  - `nhat-anh.ts`, `nhat-minh.ts`: User-specific configurations
  - `type.ts`: TypeScript type definitions
  - `photos.ts`: Gallery-related configurations

### Build System
- Vue CLI based build system with two distribution targets:
  - `dist-nhat-anh/`: Build for Nhat Anh configuration
  - `dist-nhat-minh/`: Build for Nhat Minh configuration

### Tech Stack
- Vue 3 with TypeScript
- Vue Router for navigation
- Vuex for state management
- Tailwind CSS for styling
- Axios for HTTP requests
- Jest for unit testing

## Development Workflows

### Setup & Build Commands
```bash
# Install dependencies
npm install

# Development server with hot-reload
npm run dev  # or npm run serve

# Production build
npm run build

# Run unit tests
npm run test:unit
```

### Deployment
- Custom deployment script available: `npm run deploy`
- Deploys to specific path: `/home/quannh/quannh.io.vn/calendar/`

## Project-Specific Conventions

### Directory Structure
- `src/configs/`: All application configuration files
- `src/libraries/`: Core libraries including events and lunar calendar functionality
- `src/modules/`: Vue-specific modules
- `src/views/`: Vue components organized by feature
- `src/services/`: State management and external services

### Configuration Pattern
- Environment-based configuration using `VUE_APP_` prefixed variables
- User-specific configurations split into separate files (nhat-anh.ts, nhat-minh.ts)

## Testing
- Jest-based unit testing setup
- Test files located in `tests/unit/`
- Run tests with `npm run test:unit`

## Common Development Tasks

### Adding New Features
1. Add configuration in appropriate config file if needed
2. Create new components in `src/views/`
3. Update router in `src/router/` if adding new routes
4. Add services in `src/services/` for data management

### Building for Different Users
- Ensure correct configuration is selected in build process
- Use appropriate distribution folder based on target user

## Integration Points
- CORS-enabled API communication
- Axios interceptors for HTTP requests
- Vue Router integration for navigation
- Vuex store for state management