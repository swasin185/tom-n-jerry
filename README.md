# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
npm install -g npm@latest
-- @nuxt/ui @nuxt/icon @nuxt/test-utils
pnpm create nuxt@latest $1 -- -t ui
cd $1
pnpm approve-builds
corepack use pnpm@latest
npx nuxi@latest module add auth-utils 
pnpm add -D tailwindcss
pnpm add -D big.js @types/big.js
pnpm add -D vitest
pnpm add -D @types/node
```