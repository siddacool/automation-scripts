import monkey, { type MonkeyUserScript } from 'vite-plugin-monkey';
import type { Plugin } from 'vite';
import { REPO_SLUG } from './constants.ts';

export interface MonkeyOptions {
  /** Unique package name */
  packageName: string;
  /** Human-readable script name */
  displayName: string;
  /** Version string, e.g., "1.0.0" or "1.0.0-beta" */
  version: string;
  /** Array of URL match patterns */
  match: string[];
  /** Optional description */
  description?: string;
  /** Optional author name */
  author?: string;
  /** Optional icon URL */
  icon?: string;
  /** Optional custom entry point (default: 'src/main.ts') */
  entry?: string;
  /** Additional MonkeyUserScript properties */
  userscriptProps?: Partial<MonkeyUserScript>;
}

/**
 * Creates a Vite plugin configured for a userscript via `vite-plugin-monkey`.
 *
 * Automatically handles:
 * - Beta version suffixing (`.beta`) in filenames and display name
 * - Default or custom entry point
 * - GitHub URLs for namespace, update, and download
 *
 * @param options - Plugin configuration
 * @returns An array of Vite plugins
 */
export function createMonkeyPlugin({
  packageName,
  displayName,
  version,
  match,
  description,
  author,
  icon,
  entry = 'src/main.ts',
  userscriptProps,
}: MonkeyOptions): Plugin[] {
  const isBeta = version.includes('beta');
  const baseName = `${packageName}${isBeta ? '.beta' : ''}`;
  const baseURL = `https://raw.githubusercontent.com/${REPO_SLUG}/gh-pages/packages/${packageName}/${baseName}`;

  return monkey({
    entry,
    userscript: {
      name: isBeta ? `${displayName} (Beta)` : displayName,
      description,
      version,
      author,
      icon,
      namespace: `https://github.com/${REPO_SLUG}/tree/main/scripts/${packageName}`,
      match,
      grant: 'none',
      updateURL: `${baseURL}.meta.js`,
      downloadURL: `${baseURL}.user.js`,
      ...userscriptProps,
    },
    build: {
      fileName: `${baseName}.user.js`,
      metaFileName: `${baseName}.meta.js`,
    },
  });
}
