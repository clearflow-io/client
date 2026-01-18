# ClearFlow Frontend Project Guidelines (AGENTS.md)

This document outlines the architectural principles, coding standards, and best practices for the ClearFlow React frontend project. All contributors (human and AI) should adhere to these guidelines to ensure consistency and maintainability.

## 🏗️ Architectural Principles

### 1. Unified Routing & Type Safety
- **TanStack Router**: All routing must be defined using the File-Based Routing system in `src/routes`.
- **Zod Validation**: Use Zod for search parameter validation (`validateSearch`) in routes to ensure the URL state is always type-safe.
- **Link Components**: Always use the `@tanstack/react-router` `Link` component for internal navigation to maintain type-checked routes.

### 2. Data Fetching (Server State)
- **TanStack Query**: Use Query for all asynchronous state. Never use `useEffect` for data fetching.
- **Query Factories**: Maintain a `src/hooks/queries` directory. Organize queries into "Query Key Factories" to ensure cache consistency.
- **Backend Decoupling**: Since the backend is separate, all API calls must go through a dedicated `src/lib/api-client.ts` (using Axios or Fetch).

### 3. Component Architecture
- **ShadCN UI**: All primitive components reside in `src/components/ui`. Do not modify these directly unless global design changes are required.
- **Composition over Inheritance**: Build complex UI by composing small, atomic components.
- **Clerk Integration**: Use the high-level `<SignedIn>`, `<SignedOut>`, and `useAuth` hooks. Protect routes using the TanStack Router `beforeLoad` hook for true middleware-like protection.

## 💻 Coding Standards

### 1. TypeScript Rigor
- **Strict Mode**: No use of `any`. If a type is unknown, use `unknown`.
- **Inference**: Leverage TypeScript's inference for hooks, but explicitly define types for API responses and component Props.
- **TanStack Router Utilities**: Use `getRouteApi` for accessing route-specific data/params within components to maintain type safety without passing props.

### 2. Formatting & Linting (Biome)
- **Biome**: Use Biome for all formatting and linting. No ESLint or Prettier should be used in this project.
- **Auto-Fix**: Always run `bun x biome check --write` to apply safe fixes and format code.

### 3. Styling (Tailwind CSS 4.0)
- Use Tailwind utility classes for all styling.
- Follow the "Mobile First" responsive design pattern.
- Avoid "Magic Numbers" in padding/margin; stick to the Tailwind spacing scale.

### 3. Form Handling
- **TanStack Form**: Use `@tanstack/react-form` for all form logic.
- **Validation**: Integrate Zod with TanStack Form for field-level and form-level validation.

## 🤖 AI Interaction Guidelines

### 🚫 Environment Respect
- **Bun Runtime**: Use `bun` as the package manager and runtime. Avoid `npm` or `node` commands.
- **Port Management**: The default development port is `5173`. Do not kill processes on this port.
- **Process Cleanup**: When running build checks, ensure no background Vite processes are left hanging.

### 🛠️ Build Safety Checklist
Before concluding any task, the following must be verified:
1. **Type Check**: Run `bun run typecheck` to ensure no TypeScript regressions.
2. **TanStack Route Generation**: Run `bun x tsr generate` if any route files were added or modified to ensure the route tree is updated.
3. **Biome Check**: Run `bun x biome check --write ./src` to ensure code style and linting rules are met.
4. **Vite Build**: Run `bun run build` to ensure the project bundles successfully without errors.

### 🚀 Implementation Workflow
- **Route First**: When adding a feature, start by creating the route in `src/routes`.
- **Query Second**: Define the TanStack Query hook for any needed data.
- **UI Third**: Build the UI using ShadCN and Tailwind.
- **Wire Up**: Connect the Query to the UI using the `useSuspenseQuery` or `useQuery` hooks.