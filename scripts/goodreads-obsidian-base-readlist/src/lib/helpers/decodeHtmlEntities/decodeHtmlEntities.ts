/**
 * Decodes HTML entities into their corresponding characters.
 *
 * This function leverages the browser's HTML parser by assigning the
 * input string to a temporary `<textarea>` element and reading its value.
 *
 * Fallback behavior:
 * - Returns an empty string if the input is `undefined`, `null`, or empty
 *
 * ⚠️ This function depends on the browser DOM and must be executed
 * in a browser or DOM-enabled test environment (e.g. jsdom).
 *
 * @param text - A string containing HTML entities (e.g. "&amp;", "&quot;")
 * @returns A decoded string with HTML entities resolved
 *
 * @example
 * decodeHtmlEntities('Tom &amp; Jerry')
 * // "Tom & Jerry"
 *
 * @example
 * decodeHtmlEntities('&lt;div&gt;Hello&lt;/div&gt;')
 * // "<div>Hello</div>"
 */
export function decodeHtmlEntities(text?: string): string {
  if (!text) return '';

  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;

  return textarea.value;
}
