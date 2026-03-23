export function getGenres(): string[] {
  const genresRaw = document.querySelectorAll('.BookPageMetadataSection__genreButton');
  const genres: string[] = [];

  genresRaw.forEach((item) => {
    const content = item.querySelector('.Button__labelItem')?.textContent.trim() || '';

    if (content) {
      genres.push(content);
    }
  });

  return genres;
}
