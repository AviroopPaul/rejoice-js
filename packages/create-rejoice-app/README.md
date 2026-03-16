# create-rejoice-app

Scaffold a batteries-included React app powered by `rejoice-js`.

The generated app comes prewired with:

- Ant Design 5
- styled-components
- Zustand
- built-in light/dark theme support
- zero-config JSX via `rejoice-js`
- optional React Router setup
- TypeScript + Vite

## Quick start

```bash
npx create-rejoice-app my-app
cd my-app
pnpm install
pnpm dev
```

You can also run it without arguments and answer the prompts:

```bash
npx create-rejoice-app
```

## What the CLI asks for

- project name
- whether to include React Router v6
- default theme: light or dark
- package manager: `pnpm`, `npm`, or `yarn`
- whether to initialize a git repository

## Generated app basics

The scaffolded app is set up to use `rejoice-js` as the JSX import source and includes:

- `RejoiceProvider` for theme wiring
- Ant Design components
- `styled` from styled-components
- Zustand state store examples
- starter app structure ready for agent-driven edits

## Workspace note

If you scaffold inside an existing `pnpm` workspace, install dependencies in the generated app with:

```bash
pnpm install --ignore-workspace
```

## Related package

If you want to use the runtime package directly, see [`rejoice-js`](https://www.npmjs.com/package/rejoice-js).
