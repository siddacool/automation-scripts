/**
 * Extracts the number of pages from a string.
 *
 * Example:
 * - "320 pages" → 320
 * - "About 250 Pages" → 250
 *
 * @param {string} input - Raw text containing page information
 * @returns {number | null} Extracted page count or null if not found
 */
export function extractPages(input: string): number | null {
  const match: RegExpMatchArray | null = input.match(/(\d+)\s*pages/i);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Retrieves the page count from the DOM.
 *
 * It looks for an element with `[data-testid="pagesFormat"]`,
 * extracts its text content, and parses the number of pages.
 *
 * @returns {number} Page count, or 0 if not found
 */
export function getPageNumber(): number {
  const publicationInfo: string =
    document.querySelector('[data-testid="pagesFormat"]')?.textContent || '';

  const pages: number = extractPages(publicationInfo) || 0;

  return pages;
}
