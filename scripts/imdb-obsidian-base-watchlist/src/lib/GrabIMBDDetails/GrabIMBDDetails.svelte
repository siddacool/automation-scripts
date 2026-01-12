<script lang="ts">
  import { copyToClipboard } from '@repo/shared-browser';
  import ActionTooltip from '../ActionTooltip.svelte';
  import Button from '../Button.svelte';
  import { getDatabase } from './data';

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
  <Button title="Grab IMDB details" {onclick} />
  <ActionTooltip description="Copied!" trigger={tooltipTrigger} />
</div>

<style lang="scss">
  .GrabIMBDDetails {
    position: relative;
    top: 3px;
  }
</style>
