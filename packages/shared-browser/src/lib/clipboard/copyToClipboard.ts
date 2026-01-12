/**
 * Copies text to the user's clipboard.
 *
 * @param text - The text to copy.
 * @returns A promise that resolves when the text has been copied, or rejects if it fails.
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (typeof navigator === 'undefined') {
    throw new Error('copyToClipboard can only be used in the browser');
  }

  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard:', text);
  } catch (err) {
    console.error('Unable to copy text to clipboard.', err);
    throw err;
  }
}
