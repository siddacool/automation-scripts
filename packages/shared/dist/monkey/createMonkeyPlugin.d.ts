import { type MonkeyUserScript } from 'vite-plugin-monkey';
import type { Plugin } from 'vite';
export declare function createMonkeyPlugin(options: {
    packageName: string;
    displayName: string;
    version: string;
    match: string[];
    description?: string;
    author?: string;
    icon?: string;
    userscriptProps?: Partial<MonkeyUserScript>;
}): Plugin[];
