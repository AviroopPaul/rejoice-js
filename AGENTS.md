# AGENTS.md

## Repo purpose
- This repo is a `pnpm` + Turbo monorepo for a batteries-included React agent package.
- `packages/rejoice` publishes `rejoice-js`, a React-facing library that re-exports React primitives plus an opinionated stack: Ant Design, styled-components, Zustand, JSX runtime helpers, and a built-in light/dark theme provider.
- `packages/create-rejoice-app` publishes `create-rejoice-app`, a CLI scaffolder that generates a TypeScript Vite app prewired to use `rejoice-js`, with optional router setup, default theme selection, package-manager choice, and optional git init.
- The intent of the repo is to give coding agents and developers a stable, preselected frontend surface so new apps can start without setup churn or library selection debates.

## Working expectations
- Preserve the package’s opinionated, batteries-included positioning. Do not dilute it into a generic starter unless the user explicitly asks.
- Prefer minimal, focused edits. Do not reformat unrelated files.
- Treat this as a package repo, not an application repo. Changes should keep publishability and scaffolding behavior in mind.
- Unless the user explicitly asks for release work, assume the task is code or docs only.

## PR instructions
- Always start PR work from a fresh branch created from `origin/main`.
- Before making changes, inspect the delta against `origin/main` and understand what is already different.
- Only commit the delta for the requested task unless the user explicitly asks for additional cleanup or bundled changes.
- Do not include unrelated local changes in the commit.
- When preparing a PR, include:
  - proper description
  - why the change is needed
  - files touched
  - type of change: `high`, `medium`, or `low`

## Release instructions
- Current release is `0.1.0`.
- Do not publish a new release unless the user explicitly asks for a release or publish action.
- Do not assume every commit requires a version bump.
- Do not change package versions, create release tags, publish packages, or prepare release artifacts unless the user has clearly asked for that.
