# ClearFlow Frontend Project Guidelines (AGENTS.md)

This document outlines the architectural principles, coding standards, and best practices for the ClearFlow React frontend project. All contributors (human and AI) should adhere to these guidelines to ensure consistency and maintainability.

## 🏗️ Architectural Principles

### 1. Unified Routing & Type Safety
- **TanStack Router**: All routing must be defined using the File-Based Routing system in `src/routes`.
- **Route Context**: Use `createRootRouteWithContext<MyRouterContext>()` in `__root.tsx` to provide global dependencies like `queryClient`.
- **Loaders**: Use `loader` for pre-fetching data. Prefer `useLoaderData()` or `useSuspenseQuery` for accessing data in components to avoid waterfalling.
- **Zod Validation**: Use Zod for search parameter validation (`validateSearch`) in routes to ensure the URL state is always type-safe.
- **Link Components**: Always use the `@tanstack/react-router` `Link` component for internal navigation to maintain type-checked routes.

### 2. Data Fetching & Server Logic
- **TanStack Query**: Use Query for all asynchronous client-side state. Never use `useEffect` for data fetching.
- **Query Factories**: Maintain a `src/hooks/queries` directory. Organize queries into "Query Key Factories" to ensure cache consistency.
- **Server Functions (RPC)**: Use `createServerFn` from `@tanstack/react-start` for full-stack communication.
    - Always define `method` ("GET" or "POST").
    - Use `.inputValidator()` for type-safe inputs (simple functions or Zod).
    - Use `router.invalidate()` on the client to refresh the route tree after a server-side mutation.
- **API Handlers**: For traditional REST-like endpoints, use the `server.handlers` property inside `createFileRoute`. This allows defining `GET`, `POST`, etc., directly in the route file.
- **Backend Decoupling**: Since the main backend is separate, all external API calls must go through a dedicated `src/lib/api-client.ts`.
- **camelCase for API Payloads**: All request/response payloads to the backend API MUST use camelCase property names (e.g., `firstName`, `clerkId`). Never use snake_case in API interfaces or request bodies.

### 3. Component Architecture & Authentication
- **ShadCN UI**: All primitive components reside in `src/components/ui`. Do not modify these directly unless global design changes are required.
- **Composition over Inheritance**: Build complex UI by composing small, atomic components.
- **Clerk Integration**: Use the high-level `<SignedIn>`, `<SignedOut>`, and `useAuth`/`useUser` hooks. Protect routes using the TanStack Router `beforeLoad` hook for true middleware-like protection.
- **SSR Control**: Manage Server-Side Rendering per route using the `ssr: boolean` property in `createFileRoute`. Use `ssr: false` for SPA-only sections.

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
- **Bun Runtime**: Use `bun` as the package manager and runtime. Use `bunx` instead of `npx`. Avoid `npm` or `node` commands.
- **Port Management**: The default development port is `3000`. Do not kill processes on this port.
- **Process Cleanup**: When running build checks, ensure no background Vite processes are left hanging.

### 🛠️ Build Safety Checklist
Before concluding any task, the following must be verified:
1. **Route Generation**: Run `bun x tsr generate` if ANY files in `src/routes` were added, modified, or removed.
2. **Type Check**: Run `bun run typecheck` to ensure no TypeScript regressions.
3. **Biome Check**: Run `bun run check` to ensure code style, formatting, and linting rules are met.
4. **Vite Build**: Run `bun run build` to ensure the project bundles successfully without errors.

### 🚀 Implementation Workflow
- **Route First**: When adding a feature, start by creating the route in `src/routes`.
- **Query Second**: Define the TanStack Query hook for any needed data.
- **UI Third**: Build the UI using ShadCN and Tailwind.
- **Wire Up**: Connect the Query to the UI using the `useSuspenseQuery` or `useQuery` hooks.