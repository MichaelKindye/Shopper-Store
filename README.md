# Mock E-commerce Store (Frontend-only)

This folder is a self-contained mock storefront built with Vite, React, and TypeScript. It includes a simple mock API, Cart context, and a handful of pages and components to serve as a frontend demo and handoff-ready scaffold.

Quick start

1. cd into the project folder

   ```powershell
   cd "c:/MyTemporaryFolder/Haile files/Projects/Landing page/e-commerce"
   npm install
   npm run dev
   ```

2. Seed localStorage (the app also calls seed() on first render):

   - localStorage keys: `cart`, `wishlist`, `orders` will be created if missing

Running tests

  npm run test

What is included

- Minimal TypeScript types in `src/types.ts`.
- Mock API: `src/mock/products.ts` and `src/mock/seed.ts`.
- Cart context with localStorage persistence: `src/context/CartContext.tsx`.
- Pages: Home, Category, Product, Cart, Checkout, Account in `src/pages`.
- Components: Header, Footer, ProductCard, ProductGrid.
- Utilities: currency formatter in `src/utils`.
- Basic unit tests in `src/__tests__`.

Notes and next steps

- To replace mock API with a real backend, swap the functions exported from `src/mock` with fetch calls and adapt shapes.
- To wire a real payment provider, implement tokenization in the Checkout flow and replace the simulated payment section.
- Add more tests and accessibility checks as you extend components.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
