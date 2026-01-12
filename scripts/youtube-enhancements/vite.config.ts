import { defineConfig } from 'vite';
import { createMonkeyPlugin } from '@repo/shared';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    ...createMonkeyPlugin({
      packageName: 'youtube-enhancements',
      displayName: 'YouTube Enhancements',
      version: pkg.version,
      match: ['https://www.youtube.com/*'],
    }),
  ],
});
