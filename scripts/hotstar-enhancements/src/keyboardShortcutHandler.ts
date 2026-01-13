/**
 * Handles keyboard shortcuts for video playback.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 */
export function keyboardShortcutHandler(event: KeyboardEvent): void {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();

    const player: HTMLElement | null =
      document.querySelector('button[aria-label="Play"]') ||
      document.querySelector('button[aria-label="Pause"]') ||
      document.querySelector('.skin-container');

    console.log('handleKeyboardShortcut', player);
    player?.click();
  }
}
