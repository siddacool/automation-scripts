<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { MouseEventHandler } from 'svelte/elements';

  type Props = {
    title: string;
    onclick?: MouseEventHandler<HTMLButtonElement> | null | undefined;
  };

  const { title, onclick }: Props = $props();
</script>

<button {title} type="button" {onclick} aria-label={title}>
  <Icon
    icon="material-symbols:file-copy-rounded"
    width="24"
    height="24"
    aria-hidden="true"
    focusable="false"
  />
</button>

<style lang="scss">
  button {
    width: 35px;
    height: 35px;
    display: flex;
    background: transparent;
    border: 0;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    transition: all 100ms;
    color: #fff;

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
