# rejoice-js

`rejoice-js` is a batteries-included React package for building apps with a stable, opinionated stack.

It re-exports React plus:

- Ant Design 5
- styled-components
- Zustand
- light/dark theme helpers
- JSX runtime helpers

## Install

```bash
pnpm add rejoice-js react react-dom
```

## Basic usage

```tsx
import { Button, RejoiceProvider, createRoot, styled, useTheme } from "rejoice-js";

const Box = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surface};
`;

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Box>
      <Button onClick={toggleTheme}>{isDarkMode ? "Switch to light" : "Switch to dark"}</Button>
    </Box>
  );
}

createRoot(document.getElementById("root")!).render(
  <RejoiceProvider defaultTheme="light">
    <App />
  </RejoiceProvider>
);
```

## Included features

- React exports from a single package surface
- `RejoiceProvider` for Ant Design + styled-components theme wiring
- `useTheme` and persisted dark/light mode state
- Ant Design component exports
- Zustand store helpers and middleware exports
- styled-components exports including `styled`, `css`, and `createGlobalStyle`

## Scaffolding

If you want a ready-made Bun-powered starter app instead of wiring this manually, use [`create-rejoice-app`](https://www.npmjs.com/package/create-rejoice-app).
