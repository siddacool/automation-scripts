/**
 * Copies text to the user's clipboard.
 *
 * @param text - The text to copy.
 * @returns A promise that resolves when the text has been copied.
 * @throws Will throw an error if clipboard access fails or if not in a browser.
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    throw new Error('copyToClipboard can only be used in the browser with clipboard support');
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Unable to copy text to clipboard.', err);
    throw err;
  }
}
