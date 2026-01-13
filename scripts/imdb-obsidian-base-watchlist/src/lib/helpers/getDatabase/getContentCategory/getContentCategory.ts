/**
 * Determines a high-level content category based on IMDb metadata.
 *
 * Priority order:
 * 1. Documentary genre (explicit IMDb genre list)
 * 2. Anime (detected from IMDb "interests" DOM section)
 * 3. Content type fallback (TV Series or Movie)
 *
 * ⚠️ This function depends on the browser DOM when detecting Anime.
 * It is intended to run in a browser or DOM-enabled test environment.
 *
 * @param contentType - IMDb content type (e.g. "Movie", "TVSeries")
 * @param genre - List of IMDb genre strings
 * @returns A normalized content category
 *
 * @example
 * getContentCategory('Movie', ['Action', 'Documentary'])
 * // "Documentary"
 *
 * @example
 * getContentCategory('TVSeries', [])
 * // "TV Series"
 */
export function getContentCategory(contentType: string, genre: string[]): string {
  // Explicit genre always wins
  if (genre.includes('Documentary')) return 'Documentary';

  // IMDb sometimes exposes Anime only via the DOM "interests" section
  const genresDirect = document.querySelector('[data-testid="interests"]')?.querySelectorAll('a');

  if (genresDirect) {
    for (let i = 0; i < genresDirect.length; i++) {
      if (genresDirect[i].textContent?.trim() === 'Anime') {
        return 'Anime';
      }
    }
  }

  switch (contentType) {
    case 'TVSeries':
      return 'TV Series';
    case 'Movie':
    default:
      return 'Movie';
  }
}
