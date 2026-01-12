import { mount } from 'svelte';
import App from './App.svelte';

const app = mount(App, {
  target: (() => {
    const app = document.createElement('div');

    const titleElement = document.querySelector('[data-testid="hero__pageTitle"]');

    titleElement?.append(app);
    return app;
  })(),
});

export default app;
