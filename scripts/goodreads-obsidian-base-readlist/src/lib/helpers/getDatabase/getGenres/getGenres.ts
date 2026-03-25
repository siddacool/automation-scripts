/**
 * List of genres to ignore (normalized, no spaces).
 *
 * Example:
 * - "Audiobook"
 */
export const IGNORE_GENRES: Set<string> = new Set(['Audiobook']);

/**
 * Mapping of normalized genres to desired output format.
 *
 * Example:
 * - "HistoricalFiction" → "historicFiction"
 */
export const GENRE_FORMAT_MAP: Record<string, string> = {
  HistoricalFiction: 'historicFiction',
};

/**
 * Normalizes genre text by removing all whitespace.
 *
 * Example:
 * - "Indian Literature" → "IndianLiterature"
 *
 * @param {string} text - Raw genre text
 * @returns {string} Normalized genre string
 */
export function normalizeGenre(text: string): string {
  return text.replace(/\s+/g, '');
}

/**
 * Formats a normalized genre using predefined mappings.
 *
 * Falls back to the original genre if no mapping exists.
 *
 * @param {string} genre - Normalized genre string
 * @returns {string} Formatted genre string
 */
export function formatGenre(genre: string): string {
  return GENRE_FORMAT_MAP[genre] || genre;
}

/**
 * Extracts raw text content from a genre element.
 *
 * @param {Element} element - DOM element containing genre label
 * @returns {string} Raw text content or empty string
 */
export function getGenreText(element: Element): string {
  return element.querySelector('.Button__labelItem')?.textContent || '';
}

/**
 * Checks whether a formatted genre should be included.
 *
 * @param {string} genre - Formatted genre string
 * @returns {boolean} True if the genre should be included
 */
export function isValidGenre(genre: string): boolean {
  return Boolean(genre) && !IGNORE_GENRES.has(genre);
}

/**
 * Processes a raw genre string through normalization and formatting.
 *
 * @param {string} rawText - Raw genre text
 * @returns {string} Final processed genre
 */
export function processGenre(rawText: string): string {
  const normalized: string = normalizeGenre(rawText);
  const formatted: string = formatGenre(normalized);

  return formatted;
}

/**
 * Extracts genre names from a list of DOM elements.
 *
 * Steps:
 * 1. Get raw text
 * 2. Normalize text
 * 3. Format genre
 * 4. Filter valid genres
 *
 * @param {Element[]} elements - List of DOM elements containing genre labels
 * @returns {string[]} Array of processed genre names
 */
export function extractGenresFromElements(elements: Element[]): string[] {
  const genres: string[] = [];

  elements.forEach((element: Element) => {
    const rawText: string = getGenreText(element);
    const processed: string = processGenre(rawText);

    if (isValidGenre(processed)) {
      genres.push(processed);
    }
  });

  return genres;
}

/**
 * Extracts genre names directly from the DOM.
 *
 * It selects all `.BookPageMetadataSection__genreButton` elements
 * and delegates processing to `extractGenresFromElements`.
 *
 * @returns {string[]} Array of processed genre names
 */
export function getGenres(): string[] {
  const elements: Element[] = Array.from(
    document.querySelectorAll('.BookPageMetadataSection__genreButton'),
  );

  return extractGenresFromElements(elements);
}
