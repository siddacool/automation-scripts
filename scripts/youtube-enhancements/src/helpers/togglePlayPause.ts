/**
 * Triggers the YouTube play/pause shortcut.
 * Currently simulates pressing "k".
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
