import GrabIMBDDetails from './lib/GrabIMBDDetails/GrabIMBDDetails.svelte';
import { mountSvelteComponents } from '@repo/shared-browser';

mountSvelteComponents([
  {
    component: GrabIMBDDetails,
    target: document.querySelector('[data-testid="hero__pageTitle"]'),
    styles: { display: 'inline-flex' },
  },
]);
