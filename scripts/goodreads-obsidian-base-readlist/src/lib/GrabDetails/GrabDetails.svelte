<script lang="ts">
  import { copyToClipboard } from '@repo/shared-browser';
  import { getDatabase } from '../helpers/getDatabase';
  import { convertToMarkdown } from '../helpers/convertToMarkdown/convertToMarkdown';
  import Button from '../Button.svelte';

  async function onclick() {
    try {
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
</div>

<style lang="scss">
  .GrabDetails {
    display: flex;
    width: 100%;
    margin-top: 8px;
    position: relative;
  }
</style>
