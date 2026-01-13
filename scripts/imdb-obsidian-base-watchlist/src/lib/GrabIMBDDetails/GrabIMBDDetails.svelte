<script lang="ts">
  import { copyToClipboard } from '@repo/shared-browser';
  import ActionTooltip from '../ActionTooltip.svelte';
  import IconButton from '../IconButton.svelte';
  import { getDatabase } from './data';
  import Icon from '@iconify/svelte';

  let tooltipTrigger = $state(0);

  async function onclick() {
    try {
      tooltipTrigger++;
      const data = getDatabase();

      await copyToClipboard(JSON.stringify(data));
    } catch (e) {
      console.log('debug:', e);
    }
  }
</script>

<div class="GrabIMBDDetails">
  <IconButton title="Grab IMDB details" {onclick}>
    <Icon icon="iconamoon:copy-bold" width="24" height="24" aria-hidden="true" focusable="false" />
  </IconButton>
  <ActionTooltip description="Copied!" trigger={tooltipTrigger} />
</div>

<style lang="scss">
  .GrabIMBDDetails {
    position: relative;
    display: inline-flex;
  }
</style>
