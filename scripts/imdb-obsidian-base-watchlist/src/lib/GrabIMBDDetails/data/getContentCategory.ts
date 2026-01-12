/**
 * Determine category based on type + genre
 */
export function getContentCategory(contentType: string, genre: string[]): string {
  if (genre.includes('Documentary')) return 'Documentary';

  const genresDirect = document.querySelector('[data-testid="interests"]')?.querySelectorAll('a');
  if (genresDirect) {
    for (let i = 0; i < genresDirect.length; i++) {
      if (genresDirect[i].textContent?.trim() === 'Anime') return 'Anime';
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
