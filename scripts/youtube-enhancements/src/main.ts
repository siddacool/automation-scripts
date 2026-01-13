import { keyboardShortcutHandler } from './keyboardShortcutHandler/keyboardShortcutHandler';

/**
 * Sets up global keyboard event listeners with cleanup on page unload.
 */
function setupGlobalKeyboardEvents(): void {
  window.addEventListener('keydown', keyboardShortcutHandler);

  // Remove the listener on page unload to prevent memory leaks
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('keydown', keyboardShortcutHandler);
  });
}

/**
 * Main entry point for the userscript.
 * Initializes all necessary functionality.
 */
function main(): void {
  setupGlobalKeyboardEvents();
}

// Run the script
main();
