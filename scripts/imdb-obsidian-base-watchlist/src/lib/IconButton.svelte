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

<button {title} type="button" {onclick} aria-label={title} class="IconButton">
  {@render children?.()}
</button>

<style lang="scss">
  button {
    width: 40px;
    height: 40px;
    display: flex;
    background: transparent;
    border: 0;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    transition: all 100ms;
    color: #fff;
    font-size: 1.2rem;
    padding: 0;

    /* ✅ Visible keyboard focus */
    &:focus-visible {
      outline: 2px solid #f5c518;
      outline-offset: 2px;
      background: rgb(0 0 0 / 25%);
    }

    &:hover {
      color: #f5c518;
      background: rgb(0 0 0 / 25%);
    }
  }
</style>
