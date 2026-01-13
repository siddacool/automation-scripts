/**
 * Extracts the country of origin from the IMDb title details section.
 *
 * The function reads the DOM element identified by
 * `[data-testid="title-details-origin"]` and extracts country names
 * from its list items.
 *
 * Normalization rules:
 * - "United States" → "US"
 * - "United Kingdom" → "UK"
 * - Other country names are returned as-is
 *
 * Fallback behavior:
 * - Returns `['US']` if the DOM element is missing
 * - Returns `['US']` if no valid country entries are found
 *
 * ⚠️ This function depends on the browser DOM and must be executed
 * in a browser or a DOM-enabled test environment (e.g. jsdom).
 *
 * @returns An array of country codes or country names
 *
 * @example
 * // DOM contains "United States" and "Canada"
 * getCountryOfOrigin()
 * // ["US", "Canada"]
 */
export function getCountryOfOrigin(): string[] {
  const nodes = document
    .querySelector('[data-testid="title-details-origin"]')
    ?.querySelectorAll('ul li');

  if (!nodes || !nodes.length) return ['US'];

  const countries: string[] = [];

  nodes.forEach((el) => {
    const txt = el.textContent?.trim();
    if (!txt) return;

    if (txt === 'United States') countries.push('US');
    else if (txt === 'United Kingdom') countries.push('UK');
    else countries.push(txt);
  });

  return countries.length ? countries : ['US'];
}
