/**
 * Simulates a keyboard key press by dispatching a `KeyboardEvent` to the document.
 *
 * @param key - The key to simulate (e.g., "k", "Enter", "a").
 *
 * @example
 * ```ts
 * simulateKeyPress('k');     // Simulates pressing "k"
 * simulateKeyPress('Enter'); // Simulates pressing Enter
 * ```
 */
export default function simulateKeyPress(key: string): void {
  const keyCode = key.length === 1 ? key.toUpperCase().charCodeAt(0) : 0;

  const event = new KeyboardEvent('keydown', {
    key,
    code: `Key${key.toUpperCase()}`,
    keyCode,
    which: keyCode,
    charCode: keyCode,
    bubbles: true,
    cancelable: true,
  });

  document.dispatchEvent(event);
}
