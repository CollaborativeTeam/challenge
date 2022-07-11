The purpose of this first iteration of the challenge is to render a table with the given static data ```Transactions``` in ```challenge\src\components\pages\home\index.tsx```

The idea is that in a simple way we start creating react components from scratch with good practices, design patterns and conventions

Each of you must create a branch from main called ```develop-[yourname]```, i.e. ```develop-juanma``` in my case, you must start working on that branch as your main branch, then from that branch you must create an other one called ```feature/challenge-1``` and in the end this will be the branch for this first step

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Build

```bash
npm run build
```

## Linter

```bash
npm run lint
npm run lint:fix
```

Linter is integrated with husky (pre-commit), prettier and also with vscode to run on-save following the steps below:

1- Create `.vscode` directory
2- Create `settings.json` inside of it
3- Paste the following:

```json
{
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "editor.formatOnSave": true,
  "eslint.alwaysShowStatus": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Stack of technologies

- [x] NextJS
- [x] Typescript
- [x] Styled Components
- [x] ESLint & prettier
