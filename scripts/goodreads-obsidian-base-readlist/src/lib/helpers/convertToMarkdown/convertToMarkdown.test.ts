import { describe, it, expect } from 'vitest';
import { convertToMarkdown } from './convertToMarkdown';
import type { ImdbDatabase } from 'src/lib/types';

describe('convertToMarkdown', () => {
  it('converts a full IMDb entry to Markdown', () => {
    const data: ImdbDatabase = {
      name: 'Inception',
      originalName: 'Inception',
      category: 'Movie',
      rating: '8.8',
      runtime: '148 min',
      certification: 'PG-13',
      countries: ['US'],
      languages: ['English'],
      imdbLink: 'https://www.imdb.com/title/tt1375666/',
      description: 'A mind-bending thriller.',
      posters: {
        normal: 'https://example.com/normal.jpg',
        small: 'https://example.com/small.jpg',
      },
      createdAt: '2026-01-13T14:00:00',
      genre: ['Action', 'Sci-Fi'],
      years: { yearStart: 2010 },
      zettelId: '202601131400',
    };

    const markdown = convertToMarkdown(data);

    // Frontmatter
    expect(markdown).toContain('Name: Inception');
    expect(markdown).toContain('Category: Movie');
    expect(markdown).toContain('Language: English');
    expect(markdown).toContain('Country: US');
    expect(markdown).toContain('IMDB: 8.8');

    // Body content
    expect(markdown).toContain('#watchList');
    expect(markdown).toContain('# Inception (2010)');
    expect(markdown).toContain('![poster](https://example.com/small.jpg)');
    expect(markdown).toContain('A mind-bending thriller.');

    // Genre lines
    expect(markdown).toContain('  - Action');
    expect(markdown).toContain('  - Sci-Fi');

    // Zettel ID
    expect(markdown).toContain('202601131400');
  });

  it('handles missing optional fields gracefully', () => {
    const data = {} as any;
    const markdown = convertToMarkdown(data);

    // Frontmatter should exist even if fields are empty
    expect(markdown).toContain('Name: ');
    expect(markdown).toContain('Language: ');
    expect(markdown).toContain('Country: ');
    expect(markdown).toContain('In Watchlist: true');

    // Body should contain heading
    expect(markdown).toContain('#watchList');
    expect(markdown).toContain('#'); // title heading exists even if empty

    // Poster placeholder exists
    expect(markdown).toContain('![poster]()');
  });

  it('handles empty genre array correctly', () => {
    const data = {
      name: 'Test Movie',
      genre: [],
    } as any;

    const markdown = convertToMarkdown(data);

    // Should not render any genre lines
    expect(markdown).not.toContain('  -');
  });
});
