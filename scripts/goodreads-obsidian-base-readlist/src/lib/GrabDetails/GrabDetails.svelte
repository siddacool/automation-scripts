<script lang="ts">
  import { copyToClipboard } from '@repo/shared-browser';
  import { getDatabase } from '../helpers/getDatabase';
  import { convertToMarkdown } from '../helpers/convertToMarkdown/convertToMarkdown';
  import Button from '../Button.svelte';
  import ActionTooltip from '../ActionTooltip.svelte';

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

<div class="GrabDetails">
  <Button title="Grab details" {onclick}>Copy Details</Button>
  <ActionTooltip description="Copied!" trigger={tooltipTrigger} />
</div>

<style lang="scss">
  .GrabDetails {
    display: flex;
    width: 100%;
    margin-top: 8px;
    position: relative;
  }
</style>
