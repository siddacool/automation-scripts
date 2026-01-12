import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createMonkeyPlugin } from '@repo/shared';

import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    ...createMonkeyPlugin({
      packageName: 'imdb-obsidian-base-watchlist',
      displayName: 'Imdb Obsidian Base Watchlist',
      version: pkg.version,
      match: ['https://www.imdb.com/title/*'],
      icon: 'https://www.google.com/s2/favicons?sz=64&domain=https://www.imdb.com/',
    }),
  ],
});
