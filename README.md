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
