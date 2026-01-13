import { SHOW_CHANNEL_LOGO } from './customizations';
import { injectStyles } from './helpers/injectStyles';

/**
 * Hides the site's watermark/logo.
 */
export function hideLogo(): void {
  if (SHOW_CHANNEL_LOGO) {
    return;
  }

  const css = `.watermark-content { display: none !important; }`;
  injectStyles(css);
}
