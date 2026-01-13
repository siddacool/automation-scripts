/**
 * Extracts spoken languages from the IMDb title details section.
 *
 * The function reads language entries from the DOM element identified by
 * `[data-testid="title-details-languages"]`.
 *
 * Fallback behavior:
 * - Returns `['English']` if the languages section is missing
 * - Returns `['English']` if no valid language entries are found
 *
 * ⚠️ This function depends on the browser DOM and must be executed
 * in a browser or DOM-enabled test environment (e.g. jsdom).
 *
 * @returns An array of language names
 *
 * @example
 * // DOM contains "English" and "French"
 * getLanguages()
 * // ["English", "French"]
 */
export function getLanguages(): string[] {
  const nodes = document
    .querySelector('[data-testid="title-details-languages"]')
    ?.querySelectorAll('ul li');

  if (!nodes || !nodes.length) return ['English'];

  const langs: string[] = [];

  nodes.forEach((el) => {
    const txt = el.textContent?.trim();
    if (txt) langs.push(txt);
  });

  return langs.length ? langs : ['English'];
}
