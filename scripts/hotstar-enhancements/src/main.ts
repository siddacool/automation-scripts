import { delay } from '@repo/shared-browser';
import { keyboardShortcutHandler } from './keyboardShortcutHandler';
import { enhanceSubtitles } from './enhanceSubtitles';
import { hideLogo } from './hideLogo';

/**
 * Adds global keyboard event listeners with cleanup on page unload.
 */
const setupGlobalKeyboardEvents = (): void => {
  window.addEventListener('keypress', keyboardShortcutHandler);

  window.addEventListener('beforeunload', () => {
    window.removeEventListener('keypress', keyboardShortcutHandler);
  });
};

// ===========================
// MAIN FUNCTION
// ===========================

/**
 * Main function to initialize enhancements.
 */
const main = async (): Promise<void> => {
  setupGlobalKeyboardEvents();
  await delay(5000);

  enhanceSubtitles();
  hideLogo();
};

// Run the main function
main();
