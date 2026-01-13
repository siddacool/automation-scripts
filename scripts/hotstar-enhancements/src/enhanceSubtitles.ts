import { FONT_SIZE } from './customizations';
import { injectStyles } from './helpers/injectStyles';

/**
 * Enhances subtitles with custom font, size, and text shadow.
 */
export function enhanceSubtitles() {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

    .shaka-text-container span {
      font-family: 'Roboto', sans-serif !important;
      font-size: ${FONT_SIZE} !important;
      background-color: transparent !important;
      font-weight: 400 !important;
      text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
    }
  `;
  injectStyles(css);
}
