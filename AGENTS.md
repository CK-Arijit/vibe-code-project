# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 15 App Router project with TypeScript and Tailwind CSS v4.

- `app/`: route segments, layouts, and page entry points (`app/login/page.tsx`, `app/dashboard/page.tsx`).
- `components/`: reusable UI, grouped by feature (`components/auth/*`, `components/dashboard/*`).
- `types/`: shared TypeScript types (`types/index.ts`).
- Root config: `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`.
- Product context: `SPEC.MD`.
- Also include .gitignore file whenever required (example: node_modules, package-lock.json etc needs not to be committed)

Use the `@/*` import alias defined in `tsconfig.json` for internal imports.

## Build, Test, and Development Commands

- `npm install`: install dependencies.
- `npm run dev`: start local dev server (default `http://localhost:3000`).
- `npm run build`: production build check.
- `npm run start`: run the production build locally.
- `npm run lint`: run Next.js/ESLint checks.
- `npm run format`: run to format or preetify the code

Before opening a PR, run `npm run lint && npm run build`.

## Coding Style & Naming Conventions

- Language: strict TypeScript (`strict: true`), React function components.
- Indentation: 2 spaces; prefer double quotes in TS/TSX to match existing files.
- Components: PascalCase file names for feature blocks are acceptable (current repo uses kebab-case filenames with PascalCase exports; follow nearby patterns).
- Variables/functions: `camelCase`; types/interfaces: `PascalCase`.
- Styling: Tailwind utility classes and CSS variables in `app/globals.css`.
- First priority - Always try to use shadcn components instead of creating custom UI components. If any shadcn component give issue then use custom ui components
- Add shadcn primitives (example: Input, Label, Alert, etc.) whenever it is required

Keep modules focused. Prefer small reusable components over large page-level JSX blocks.

## Testing Guidelines

There is currently no test framework configured. For now before the final output always do the following:

- Treat `npm run lint` and `npm run build` as required validation.

## Commit & Pull Request Guidelines

Current history uses short, imperative messages (for example, `first commit`, `Description added for readme file`).

- Keep commit subjects concise, present tense, and specific.
- One logical change per commit where possible.
- PRs should include: summary, affected routes/components, validation steps, and screenshots for UI changes.
- Link relevant issues/spec sections when applicable.

## Agent-Specific Instruction

Work carefully and prefer the cleanest architecture over quick patches. Evaluate at least one alternative approach before major refactors, then choose the simplest solution that keeps the codebase maintainable.
