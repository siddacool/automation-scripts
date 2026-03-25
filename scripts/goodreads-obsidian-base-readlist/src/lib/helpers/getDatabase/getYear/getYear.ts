/**
 * Extracts a year from a publication info string.
 *
 * Example:
 * - "Published June 5, 2020" → 2020
 *
 * @param {string} input - Raw publication info text
 * @returns {number} Extracted year or 0 if not found
 */
export function extractYear(input: string): number {
  const yearPart: string | undefined = input.split(',')[1]?.trim();
  const year: number = Number(yearPart);

  return Number.isNaN(year) ? 0 : year;
}

/**
 * Retrieves the publication year from the DOM.
 *
 * It looks for an element with `[data-testid="publicationInfo"]`,
 * extracts its text content, and parses the year.
 *
 * @returns {number} Year or 0 if not found
 */
export function getYear(): number {
  const publicationInfo: string =
    document.querySelector('[data-testid="publicationInfo"]')?.textContent || '';

  return extractYear(publicationInfo);
}
