import togglePlayPause from './helpers/togglePlayPause';

/**
 * Handles a YouTube keyboard shortcut in fullscreen watch mode.
 * Pressing Enter triggers play/pause.
 * @param event - The native keyboard event
 */
function keyboardShortcutHandler(event: KeyboardEvent): void {
  // Ignore if not in fullscreen
  if (document.fullscreenElement === null) return;

  // Ignore if not on a YouTube watch page
  if (!window.location.href.includes('watch')) return;

  if (event.key === 'Enter') {
    event.preventDefault();

    // Trigger play/pause
    togglePlayPause();
  }
}

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
