# Rejoice-JS — Agent Instructions

This project uses **rejoice-js**, a batteries-included React package. Everything you need is re-exported from a single import source.

## Core Idea

`rejoice-js` bundles React, Ant Design, styled-components, and Zustand into one package. You do not need to install or import these separately.

```tsx
import { useState, Button, styled, create } from "rejoice-js";
```

JSX works automatically — no `import React` needed. The project uses `jsxImportSource: "rejoice-js"` in `tsconfig.json`.

## Getting Components

### Ant Design components — import directly:

```tsx
import { Button, Card, Table, Modal, Form, Input, Select, Tag } from "rejoice-js";
```

All 60+ Ant Design 5 components are available. Common ones: `Button`, `Card`, `Table`, `Modal`, `Form`, `Input`, `Select`, `Tabs`, `Tag`, `Alert`, `Drawer`, `Menu`, `Layout`, `Space`, `Flex`, `Typography`.

### Styled-components — use `styled` and `css`:

```tsx
import { styled, css, keyframes } from "rejoice-js";

const Box = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.surface};
`;
```

### React hooks and primitives:

```tsx
import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
  lazy,
  Suspense,
  forwardRef,
  createContext,
} from "rejoice-js";
```

### Zustand stores:

```tsx
import { create } from "rejoice-js";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}));
```

Middleware is also available: `persist`, `devtools`, `subscribeWithSelector`, `useShallow`.

## Theme System

The app is wrapped in `<RejoiceProvider>` which provides light/dark theming.

```tsx
import { useTheme } from "rejoice-js";

const { mode, isDark, toggle, setMode } = useTheme();
```

Theme values available in styled-components via `theme`:

- `theme.mode` — `"light"` or `"dark"`
- `theme.isDark` — boolean
- `theme.colors.background`, `.surface`, `.text`, `.primary`, `.border`
- `theme.spacing(n)` — returns `${n * 8}px`

Theme persists to localStorage automatically.

## File Structure

- `src/main.tsx` — App entry, wraps in `RejoiceProvider`
- `src/App.tsx` — Main application component
- `src/App.styles.ts` — Styled-components
- `src/store/` — Zustand stores
- `src/styled.d.ts` — Theme type definitions for styled-components

## Rules

- Always import from `"rejoice-js"` — never from `react`, `antd`, `styled-components`, or `zustand` directly.
- Do not add `react`, `antd`, `styled-components`, or `zustand` as separate dependencies. They are bundled in `rejoice-js`.
- Use Ant Design components for UI elements before creating custom ones.
- Use Zustand for state management, not React context (unless scoping is needed).
- Use `lucide-react` for icons (already installed).
