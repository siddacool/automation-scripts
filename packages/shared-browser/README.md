# Shared Browser

Edit files and run build scripts to use it.

1. pnpm --filter shared-browser build
2. pnpm install

### Usage

Use it by adding the `@repo/shared-browser` in your script's pacakage.json

```json
"dependencies": {
    "@repo/shared-browser": "workspace:*"
  }
```

### Test

`pnpm --filter shared-browser test:run`
