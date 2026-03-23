# create-rejoice-app

Scaffold a batteries-included React app powered by `rejoice-js` and Bun.

The generated app comes prewired with:

- Ant Design 5
- styled-components
- Zustand
- built-in light/dark theme support
- zero-config JSX via `rejoice-js`
- Bun as the official bundler for superfast dev and production builds
- optional React Router setup
- TypeScript + Bun

## Quick start

```bash
bunx create-rejoice-app my-app
cd my-app
bun install
bun dev
```

You can also run it without arguments and answer the prompts:

```bash
bunx create-rejoice-app
```

## CLI flags

Every interactive prompt can be skipped with a flag, making the CLI fully non-interactive for AI agents and CI:

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

When all flags are provided along with the project name, no prompts are shown:

```bash
# Fully non-interactive — ideal for agents and scripts
bunx create-rejoice-app my-app --no-router --theme light --no-git
```

## What the CLI asks for (interactive mode)

When flags are omitted, the CLI prompts for:

- project name
- whether to include React Router v6
- default theme: light or dark
- whether to initialize a git repository

## Generated app basics

The scaffolded app is set up to use `rejoice-js` as the JSX import source and Bun as the official bundler. It includes:

- `RejoiceProvider` for theme wiring
- Ant Design components
- `styled` from styled-components
- Zustand state store examples
- Bun-powered dev and production build commands
- starter app structure ready for agent-driven edits

## Related package

If you want to use the runtime package directly, see [`rejoice-js`](https://www.npmjs.com/package/rejoice-js).
