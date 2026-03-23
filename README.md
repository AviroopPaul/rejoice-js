# rejoice-js

> React, but set up already.

A batteries-included React meta-framework. Scaffold a full Bun-powered project with [Ant Design 5](https://ant.design), [styled-components](https://styled-components.com), [Zustand](https://zustand-demo.pmnd.rs), [Lucide Icons](https://lucide.dev), and dark/light mode — all wired and working from the first line.

```bash
bunx create-rejoice-app my-app
cd my-app
bun install && bun dev
```

## What's included

|                                                    |                                                     |
| -------------------------------------------------- | --------------------------------------------------- |
| [Ant Design 5](https://ant.design)                 | 50+ production-ready UI components, dark mode aware |
| [styled-components](https://styled-components.com) | CSS-in-JS with full theme token access              |
| [Zustand](https://zustand-demo.pmnd.rs)            | Minimal global state — no providers, no reducers    |
| [Lucide Icons](https://lucide.dev)                 | 500+ crisp SVG icons as React components            |
| Bun official bundler                               | Superfast dev server and production builds          |
| Dark mode                                          | Persistent via localStorage, toggle out of the box  |
| Zero-config JSX                                    | No `import React` needed anywhere                   |

## Packages

| Package                                               | Description                             |
| ----------------------------------------------------- | --------------------------------------- |
| [`rejoice-js`](./packages/rejoice)                    | Core library — re-exports all batteries |
| [`create-rejoice-app`](./packages/create-rejoice-app) | CLI scaffolder                          |

## Usage

### Scaffolding

```bash
bunx create-rejoice-app my-app
# or
bunx create-rejoice-app         # interactive prompts
```

Every prompt can be skipped with CLI flags for non-interactive use (agents, CI):

```bash
bunx create-rejoice-app my-app --router --theme dark --git
```

| Flag          | Description                       | Default |
| ------------- | --------------------------------- | ------- |
| `--router`    | Include React Router v6           | `true`  |
| `--no-router` | Skip React Router                 | —       |
| `--theme`     | Default theme (`light` or `dark`) | `light` |
| `--git`       | Initialize a git repository       | `true`  |
| `--no-git`    | Skip git init                     | —       |

### In your app

```tsx
// No import React needed
import { Button, useTheme, styled, create } from "rejoice-js";

const Box = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(3)};
`;

const useStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}));

export default function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { count, inc } = useStore();

  return (
    <Box>
      <Button onClick={inc}>Count: {count}</Button>
      <Button onClick={toggleTheme}>{isDarkMode ? "Light" : "Dark"}</Button>
    </Box>
  );
}
```

### Wrapping your app

```tsx
import { createRoot, RejoiceProvider } from "rejoice-js";

createRoot(document.getElementById("root")!).render(
  <RejoiceProvider defaultTheme="light">
    <App />
  </RejoiceProvider>
);
```

## Built for coding agents

rejoice-js gives AI coding agents (Claude Code, Codex CLI, Gemini CLI) a known, stable surface to work on — no setup debates, no conflicting library choices.

## License

MIT
