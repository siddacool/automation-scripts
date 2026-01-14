import { mount } from 'svelte';
import type { Component } from 'svelte';

export type MountStyleOptions = Partial<CSSStyleDeclaration>;

/**
 * Attaches a Svelte component to a DOM element.
 *
 * This function can be used to render Svelte components on arbitrary DOM targets
 * without the need for custom elements or Web Components.
 *
 * @template Props - Props type of the Svelte component
 * @param {Component<Props>} Component - The Svelte component to attach
 * @param {HTMLElement | Element | null} target - DOM element to attach the component to
 * @param {Props} [props] - Optional props to pass to the component
 * @param {MountStyleOptions} [styles] - Optional CSS styles to apply to the wrapper element
 */
export function mountSvelteComponent<Props extends Record<string, any>>(
  Component: Component<Props>,
  target: HTMLElement | Element | null,
  props?: Props,
  styles?: MountStyleOptions,
) {
  if (!target) return;

  const key = `svc-${Component.name || 'component'}`;
  if (target.querySelector(`.${key}`)) return;

  const el = document.createElement('div');
  el.className = key;

  if (styles) {
    Object.assign(el.style, styles);
  }

  target.append(el);

  // TS-safe Svelte 5 mount; cast props to any to avoid conditional Props TS error
  mount(Component, {
    target: el,
    props: props as any,
  });
}
