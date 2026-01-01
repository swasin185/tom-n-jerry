# Tom-n-Jerry

> A Nuxt 4 Demo Projects for Math and Science

## Project Overview

This project is a demo projects built with [Nuxt 4](https://nuxt.com), featuring a modern set of tools including Tailwind CSS (via `@nuxt/ui`) and `nuxt-auth-utils`. It is designed to be a lightweight, high-performance foundation for building web applications.

## Tech Stack

-   **Framework**: [Nuxt 4](https://nuxt.com)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Library**: [@nuxt/ui](https://ui.nuxt.com) (Tailwind CSS)
-   **Authentication**: [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils)
-   **Testing**: [Vitest](https://vitest.dev)
-   **Package Manager**: [pnpm](https://pnpm.io)

## Project Structure

-   `app/`: Main application source code (Nuxt 4 directory structure).
-   `server/`: Server-side logic and API routes.
-   `test/`: Unit and integration tests.
-   `public/`: Static assets.
-   `nuxt.config.ts`: Main configuration file.

### Key Pages & Routes

-   **`index.vue`**: Main landing page displaying build time and a counter (requires auth).
-   **`login.vue`**: Authentication page handling user login via `nuxt-auth-utils`.
-   **`[...slug].vue`**: Catch-all fallback route for handling 404s or dynamic paths.
-   **`game/`**: Educational game components including:
    -   `Mandelbrot.vue`: Mandelbrot set visualization.
    -   `Maze.vue`: Maze generation algorithm.
    -   `Monty.vue`: Monty Hall problem simulation.
    -   `Pascal.vue`: Pascal's triangle visualization.
    -   `Sort.vue`: Sorting algorithm visualizers.
-   **`math/`**: Math utility tools including:
    -   `Converter.vue`: Unit conversion tool.
    -   `Division.vue`: Division practice/calculator.
    -   `Goldbach.vue`: Goldbach conjecture demonstration.
    -   `Trigonometry.vue`: Trigonometric functions visualizer.

### API Endpoints (`server/api`)

| Endpoint             | Method | Description                                                       |
| :------------------- | :----- | :---------------------------------------------------------------- |
| `/api/auth/local`    | `POST` | Handles user login via username/password.                         |
| `/api/counter`       | `GET`  | Increments and returns a global counter (stored in Redis/Memory). |
| `/api/invoice`       | `GET`  | Returns a list of sample invoices with details.                   |
| `/api/goldbach`      | `GET`  | Computes/visualizes Goldbach's conjecture for a query param `x`.  |
| `/api/server-status` | `GET`  | Returns simple status check.                                      |
| `/api/converter`     | `GET`  | Utility for unit conversion logic.                                |
| `/api/division`      | `GET`  | Utility for division calculations.                                |
| `/api/prime`         | `GET`  | Checks if a number is prime.                                      |
| `/api/prime-list`    | `GET`  | Returns a list of prime numbers.                                  |

## Setup

### Prerequisites

-   Node.js (LTS recommended)
-   `pnpm` (required package manager)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
# Server will be running at http://localhost:3000
```

### Build

Build the application for production:

```bash
pnpm build
```

## AI Guidelines

This section provides instructions for AI assistants contributing to this project.

### 1. Package Manager

-   **ALWAYS** use `pnpm` for all package management commands (`install`, `add`, `remove`, `run`).
-   Do **NOT** use `npm` or `yarn`.

### 2. Coding Conventions

-   **Vue/Nuxt**: Use the **Vue 3 Composition API** with `<script setup lang="ts">`.
-   **Auto-imports**: Rely on Nuxt's auto-import feature for Vue composables (`ref`, `computed`) and Nuxt 4 Utils. Do not manually import them unless necessary.
-   **Styling**: Use `@nuxt/ui` components and Tailwind utility classes. Avoid writing custom CSS in `<style>` blocks unless absolutely necessary for complex animations or specific overrides.

### 3. File Structure

-   Follow the [Nuxt 4 directory structure](https://nuxt.com/docs/guide/directory-structure/nuxt).
-   Place UI components in `app/components`.
-   Place pages in `app/pages`.
-   Place server routes in `server/api`.

### 4. Testing

-   Write unit tests using `vitest`.
-   Place tests in the `test/` directory.
-   Ensure tests pass before confirming task completion.
