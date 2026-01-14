import { mountSvelteComponent } from './mountSvelteComponent.ts';
import type { MountStyleOptions } from './mountSvelteComponent.ts';
import type { Component } from 'svelte';

/**
 * Defines a Svelte component mount target with optional props and styles.
 */
export interface MountItem<Props extends Record<string, any> = {}> {
  component: Component<Props>;
  target: HTMLElement | Element | null;
  props?: Props;
  styles?: MountStyleOptions;
}

/**
 * Mounts one or more Svelte components to DOM targets and automatically remounts
 * them when the DOM changes (SPA-safe).
 *
 * Returns the MutationObserver instance, which can be disconnected if needed.
 */
export function mountSvelteComponents(items: MountItem[]) {
  function remountAll() {
    for (const item of items) {
      mountSvelteComponent(item.component, item.target, item.props, item.styles);
    }
  }

  // Initial mount
  remountAll();

  // SPA-safe MutationObserver
  const observer = new MutationObserver(remountAll);
  observer.observe(document.body, { childList: true, subtree: true });

  return observer;
}
