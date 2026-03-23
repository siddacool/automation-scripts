import GrabDetails from './lib/GrabDetails/GrabDetails.svelte';
import { mountSvelteComponents } from '@repo/shared-browser';

mountSvelteComponents([
  {
    component: GrabDetails,
    target: document.querySelector('.BookActions'),
    styles: { display: 'inline-flex' },
  },
]);
