import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createMonkeyPlugin } from '@repo/shared';

import pkg from './package.json';

export default defineConfig({
  plugins: [
    svelte(),
    ...createMonkeyPlugin({
      packageName: 'imdb-obsidian-base-watchlist',
      displayName: 'Imdb Obsidian Base Watchlist',
      description: pkg.description,
      version: pkg.version,
      match: ['https://www.imdb.com/title/*'],
      icon: 'https://www.google.com/s2/favicons?sz=64&domain=https://www.imdb.com/',
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
