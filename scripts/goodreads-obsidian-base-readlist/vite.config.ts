import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createMonkeyPlugin } from '@repo/shared';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    svelte(),
    ...createMonkeyPlugin({
      packageName: 'goodreads-obsidian-base-readlist',
      displayName: 'Copy Goodreads data to Markdown for Obsidian base',
      description: pkg.description,
      version: pkg.version,
      match: ['https://www.goodreads.com/book/*'],
      icon: 'https://www.google.com/s2/favicons?sz=64&domain=https://www.goodreads.com',
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 3,
        pure_getters: true,
        unsafe: true,
        unsafe_math: true,
      },
      format: {
        comments: false,
      },
    } as any,
  },
});
