import type { BookDatabase } from '../../types';

/**
 * Converts a BookDatabase object into a Markdown string.
 *
 * The output includes:
 * - YAML frontmatter (metadata)
 * - Title heading
 * - Poster image
 * - Zettel ID reference
 *
 * @param {BookDatabase} data - Book data object
 * @returns {string} Markdown-formatted string
 */
export function convertToMarkdown(data: BookDatabase): string {
  const {
    title = '',
    year,
    author = '',
    poster = '',
    createdAt = '',
    genre = [],
    zettelId = '',
    rating = '',
    pageUrl = '',
  } = data || {};

  const genreLines: string = genre.length
    ? genre.map((item: string) => `  - ${item}`).join('\n')
    : '  -';

  return `---
Title: ${title}
Published on: ${year ?? ''}
Author: ${author}
Goodreads: ${rating}
tags:
${genreLines}
Poster: ${poster}
Details: ${pageUrl}
Created at: ${createdAt}
---

# ${title}

![poster|200](${poster})

---
${zettelId}
`;
}
