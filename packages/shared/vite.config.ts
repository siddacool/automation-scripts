import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },

    // 🔴 REQUIRED for Node libraries
    target: 'node18',
    ssr: true,

    rollupOptions: {
      // 🔴 REQUIRED in pnpm monorepos
      external: [
        // Node builtins (including node:fs etc)
        /^node:/,

        // Native optional deps
        'fsevents',

        // Workspace deps
        /^@repo\//,
      ],
    },
  },
});
