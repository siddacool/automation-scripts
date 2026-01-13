<script lang="ts">
  import { copyToClipboard } from '@repo/shared-browser';
  import ActionTooltip from '../ActionTooltip.svelte';
  import IconButton from '../IconButton.svelte';
  import { getDatabase } from './data';
  import CopyIcon from '../Icons/CopyIcon.svelte';

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
    <CopyIcon />
  </IconButton>
  <ActionTooltip description="Copied!" trigger={tooltipTrigger} />
</div>

<style lang="scss">
  .GrabIMBDDetails {
    position: relative;
    display: inline-flex;
    top: -3px;
  }
</style>
