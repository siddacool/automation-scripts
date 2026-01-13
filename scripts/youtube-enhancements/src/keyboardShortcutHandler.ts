import { simulateKeyPress } from '@repo/shared-browser';

/**
 * Handles a YouTube keyboard shortcut in fullscreen watch mode.
 *
 * Pressing Enter triggers play/pause.
 *
 * Conditions:
 * - Only triggers if the document is in fullscreen.
 * - Only triggers on YouTube watch pages (URL includes 'watch').
 *
 * @param event - The native keyboard event
 */
export function keyboardShortcutHandler(event: KeyboardEvent): void {
  // Ignore if not in fullscreen
  if (document.fullscreenElement === null) return;

  // Ignore if not on a YouTube watch page
  if (!window.location.href.includes('watch')) return;

  if (event.key === 'Enter') {
    event.preventDefault();

    // Trigger play/pause
    // K key is used to play/pause
    simulateKeyPress('k');
  }
}
