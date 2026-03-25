<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { MouseEventHandler } from 'svelte/elements';

  type Props = {
    title: string;
    onclick?: MouseEventHandler<HTMLButtonElement> | null | undefined;
    children?: Snippet;
  };

  const { title, onclick, children }: Props = $props();
</script>

<button {title} type="button" {onclick} aria-label={title}>
  {@render children?.()}
</button>

<style lang="scss">
  button {
    height: 44px;
    padding: 0 20px;
    font-size: 1.6rem;
    display: flex;
    background: transparent;
    border: 0;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 22px;
    transition: all 100ms;
    padding: 0;
    background-color: var(--color-background-wtr-base);
    color: var(--color-text-button-wtr-base);
    border-color: var(--color-border-wtr-base);
    width: 100%;

    &:hover {
      background-color: var(--color-background-wtr-hover);
    }
  }
</style>
