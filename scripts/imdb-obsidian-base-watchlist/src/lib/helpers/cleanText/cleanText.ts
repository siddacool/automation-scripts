/**
 * Removes all colons (:) from a string.
 *
 * Examples:
 * ```ts
 * cleanText('12:34:56'); // "123456"
 * cleanText('Hello: World'); // "Hello World"
 * ```
 *
 * @param text - The string to clean
 * @returns The cleaned string without colons
 */
export function cleanText(text: string): string {
  return text.replace(/:/g, '');
}
