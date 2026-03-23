import type { BookDatabase } from '../../types';

export function convertToMarkdown(data: BookDatabase): string {
  const {
    title = '',
    year,
    author = '',
    description = '',
    poster = '',
    createdAt = '',
    genre = [],
    zettelId = '',
    rating = '',
    pageUrl = '',
  } = data || {};

  const genreLines = genre.map((item) => `  - ${item}`).join('\n');

  return `---
Title: ${title}
Published on: ${year}
Author: ${author}
Goodreads: ${rating}
tags:
${genreLines}
Poster: ${poster}
Details: ${pageUrl}
Created at: ${createdAt}
---

# ${title}

![poster](${poster})

${description}

---
${zettelId}
`;
}
