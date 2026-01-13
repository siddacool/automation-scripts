<script lang="ts">
  type Props = {
    description: string;
    trigger?: number;
    duration?: number;
  };

  const { description, trigger = 0, duration = 2000 }: Props = $props();

  let show = $state(false);
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let initialized = false;

  $effect(() => {
    // Read trigger to establish dependency
    trigger;

    if (!initialized) {
      initialized = true;
      return;
    }

    show = true;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      show = false;
    }, duration);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
  });
</script>

<span class="ActionTooltip" class:show>
  {description}
</span>

<style lang="scss">
  .ActionTooltip {
    position: absolute;
    top: 40px;
    left: -7px;
    font-size: 0.8rem;
    width: 55px;
    height: 30px;
    background-color: #000;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms ease;

    &.show {
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>
