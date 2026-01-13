<script lang="ts">
  import { copyToClipboard } from '@repo/shared-browser';
  import ActionTooltip from '../ActionTooltip.svelte';
  import IconButton from '../IconButton.svelte';
  import CopyIcon from '../Icons/CopyIcon.svelte';
  import { getDatabase } from '../helpers/getDatabase';
  import { convertToMarkdown } from '../helpers/convertToMarkdown/convertToMarkdown';

  let tooltipTrigger = $state(0);

  async function onclick() {
    try {
      tooltipTrigger++;
      const data = getDatabase();

      const markdown = convertToMarkdown(data);

      await copyToClipboard(markdown);
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
