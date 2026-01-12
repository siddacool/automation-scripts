import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import { includeIgnoreFile } from 'eslint-compat-utils';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isCI = process.env.CI === 'true';

export default [
  // 1️⃣ Gitignore as base
  includeIgnoreFile(path.resolve(__dirname, '.gitignore')),

  // 2️⃣ Extra safety ignores
  {
    ignores: ['**/node_modules/**', '**/.svelte-kit/**', '**/dist/**'],
  },

  // 3️⃣ CI-only ignores
  {
    ignores: isCI ? ['build/**'] : [],
  },

  js.configs.recommended,

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...ts.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },

  {
    files: ['**/*.svelte'],
    plugins: { svelte },
    languageOptions: {
      parserOptions: { parser: tsParser },
    },
    rules: {
      ...svelte.configs.recommended.rules,
    },
  },

  prettier,
];
