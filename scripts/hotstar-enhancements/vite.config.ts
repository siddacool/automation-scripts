import { defineConfig } from 'vitest/config';
import { createMonkeyPlugin } from '@repo/shared';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    ...createMonkeyPlugin({
      packageName: 'hotstar-enhancements',
      displayName: 'Disney+ Hotstar Enhancements',
      description: pkg.description,
      version: pkg.version,
      match: ['https://www.hotstar.com/*'],
      icon: 'https://www.google.com/s2/favicons?sz=64&domain=https://www.hotstar.com/in/',
    }),
  ],

  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
