/**
 * Triggers the YouTube play/pause shortcut by simulating a "k" key press.
 *
 * This function dispatches a `KeyboardEvent` to the document, mimicking
 * the user pressing "k", which toggles play/pause on YouTube.
 *
 * @example
 * ```ts
 * togglePlayPause(); // Simulates pressing "k"
 * ```
 */
export default function togglePlayPause(): void {
  const event = new KeyboardEvent('keydown', {
    key: 'k',
    code: 'KeyK',
    keyCode: 75,
    which: 75,
    charCode: 75,
    bubbles: true,
    cancelable: true,
  });

  document.dispatchEvent(event);
}
