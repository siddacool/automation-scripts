import { defineConfig } from 'vite';
import { createMonkeyPlugin } from '@repo/shared';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    ...createMonkeyPlugin({
      packageName: 'youtube-enhancements',
      displayName: 'YouTube Enhancements',
      description: pkg.description,
      version: pkg.version,
      match: ['https://www.youtube.com/*'],
      icon: 'https://www.google.com/s2/favicons?sz=64&domain=www.youtube.com/',
    }),
  ],
});
