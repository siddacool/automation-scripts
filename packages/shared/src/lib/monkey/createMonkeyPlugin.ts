import monkey, { type MonkeyUserScript } from 'vite-plugin-monkey';
import type { Plugin } from 'vite';
import { REPO_SLUG } from './constants.ts';

export function createMonkeyPlugin(options: {
  packageName: string;
  displayName: string;
  version: string;
  match: string[];
  description?: string;
  author?: string;
  icon?: string;
  userscriptProps?: Partial<MonkeyUserScript>;
}): Plugin[] {
  const { packageName, displayName, version, match, description, author, icon, userscriptProps } =
    options;

  const isBeta = version.includes('beta');
  const suffix = isBeta ? '.beta' : '';
  const baseName = `${packageName}${suffix}`;

  return monkey({
    entry: 'src/main.ts',
    userscript: {
      name: isBeta ? `${displayName} (Beta)` : displayName,
      description,
      version,
      author,
      icon,
      namespace: `https://github.com/${REPO_SLUG}/tree/main/packages/${packageName}`,
      match,
      grant: 'none',
      updateURL: `https://cdn.jsdelivr.net/gh/${REPO_SLUG}@${version}/packages/${packageName}/dist/${baseName}.meta.js`,
      downloadURL: `https://cdn.jsdelivr.net/gh/${REPO_SLUG}@${version}/packages/${packageName}/dist/${baseName}.user.js`,
      ...userscriptProps,
    },
    build: {
      fileName: `${baseName}.user.js`,
      metaFileName: `${baseName}.meta.js`,
    },
  });
}
