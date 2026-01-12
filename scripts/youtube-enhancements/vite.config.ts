import { defineConfig } from 'vite';
import { createMonkeyPlugin } from '@repo/shared';
import pkg from './package.json';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@automation/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
  plugins: [
    ...createMonkeyPlugin({
      packageName: 'youtube-enhancements',
      displayName: 'YouTube Enhancements',
      version: pkg.version,
      match: ['https://www.youtube.com/*'],
    }),
  ],
});
