import type { ImdbDatabase } from '../../types';

/**
 * Converts an IMDb database entry into a Markdown note suitable for Obsidian/Zettelkasten.
 *
 * The frontmatter includes metadata such as:
 * - Name, Original Name
 * - Category, Rating, Runtime, Certification
 * - Countries, Languages, Genres
 * - Poster links, IMDb link, creation date, and Zettel ID
 *
 * The body contains:
 * - Title with year
 * - Poster image
 * - Description
 * - Zettel ID at the bottom
 *
 * @param data - IMDb database entry
 * @returns A Markdown string representing the movie/series
 */
export function convertToMarkdown(data: ImdbDatabase): string {
  const {
    name = '',
    originalName = '',
    category = '',
    rating = '',
    runtime = '',
    certification = '',
    countries = [],
    languages = [],
    imdbLink = '',
    description = '',
    posters,
    createdAt = '',
    genre = [],
    years,
    zettelId = '',
  } = data || {};

  const genreLines = genre.map((item) => `  - ${item}`).join('\n');

  return `---
Name: ${name}
Year: ${years?.yearStart || ''}
pg: ${certification}
Symbol:
Original Name: ${originalName}
Category: ${category}
Language: ${languages[0] || ''}
Country: ${countries[0] || ''}
IMDB: ${rating}
Runtime: ${runtime}
Rotten:
Details: ${imdbLink}
tags:
${genreLines}
Poster: ${posters?.normal || ''}
In Watchlist: true
Watched on:
Created at: ${createdAt}
---
#watchList

# ${name} (${years?.yearStart || ''})

![poster](${posters?.small || ''})

${description}

${zettelId}
`;
}
