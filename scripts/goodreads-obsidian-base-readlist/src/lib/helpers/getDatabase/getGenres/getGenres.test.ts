// @vitest-environment jsdom

import { describe, it, expect, beforeEach } from 'vitest';
import {
  normalizeGenre,
  formatGenre,
  processGenre,
  getGenreText,
  isValidGenre,
  extractGenresFromElements,
  getGenres,
  GENRE_FORMAT_MAP,
  IGNORE_GENRES,
} from './getGenres';

describe('normalizeGenre', () => {
  it('removes all whitespace', () => {
    expect(normalizeGenre('Indian Literature')).toBe('IndianLiterature');
    expect(normalizeGenre(' Science   Fiction ')).toBe('ScienceFiction');
  });

  it('handles empty input', () => {
    expect(normalizeGenre('')).toBe('');
  });
});

describe('formatGenre', () => {
  it('formats known genres using mapping', () => {
    Object.entries(GENRE_FORMAT_MAP).forEach(([input, output]) => {
      expect(formatGenre(input)).toBe(output);
    });
  });

  it('returns original if no mapping exists', () => {
    expect(formatGenre('Fantasy')).toBe('Fantasy');
  });
});

describe('processGenre', () => {
  it('normalizes and formats correctly', () => {
    const input = 'Historical Fiction';
    const normalized = normalizeGenre(input);
    const expected = GENRE_FORMAT_MAP[normalized] || normalized;

    expect(processGenre(input)).toBe(expected);
  });
});

describe('getGenreText', () => {
  it('extracts text content', () => {
    const element = {
      querySelector: () => ({ textContent: 'Fantasy' }),
    } as unknown as Element;

    expect(getGenreText(element)).toBe('Fantasy');
  });

  it('returns empty string if missing', () => {
    const element = {
      querySelector: () => null,
    } as unknown as Element;

    expect(getGenreText(element)).toBe('');
  });
});

describe('isValidGenre', () => {
  it('returns true for valid genre', () => {
    expect(isValidGenre('Fantasy')).toBe(true);
  });

  it('filters ignored genres dynamically', () => {
    IGNORE_GENRES.forEach((genre) => {
      expect(isValidGenre(genre)).toBe(false);
    });
  });

  it('filters empty values', () => {
    expect(isValidGenre('')).toBe(false);
  });
});

describe('extractGenresFromElements', () => {
  it('processes, formats, and filters correctly', () => {
    const inputs = ['Historical Fiction', 'Audiobook', 'Science Fiction'];

    const elements = inputs.map((text) => ({
      querySelector: () => ({ textContent: text }),
    })) as unknown as Element[];

    const result = extractGenresFromElements(elements);

    const expected = inputs
      .map((text) => normalizeGenre(text))
      .map((genre) => GENRE_FORMAT_MAP[genre] || genre)
      .filter((genre) => genre && !IGNORE_GENRES.has(genre));

    expect(result).toEqual(expected);
  });

  it('handles empty or invalid elements', () => {
    const elements = [
      { querySelector: () => ({ textContent: '' }) },
      { querySelector: () => null },
    ] as unknown as Element[];

    expect(extractGenresFromElements(elements)).toEqual([]);
  });
});

describe('getGenres', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns empty array when no elements exist', () => {
    expect(getGenres()).toEqual([]);
  });

  it('extracts, formats, and filters from DOM', () => {
    const inputs = ['Historical Fiction', 'Audiobook', 'Science Fiction'];

    document.body.innerHTML = inputs
      .map(
        (text) => `
        <div class="BookPageMetadataSection__genreButton">
          <span class="Button__labelItem">${text}</span>
        </div>
      `,
      )
      .join('');

    const result = getGenres();

    const expected = inputs
      .map((text) => normalizeGenre(text))
      .map((genre) => GENRE_FORMAT_MAP[genre] || genre)
      .filter((genre) => genre && !IGNORE_GENRES.has(genre));

    expect(result).toEqual(expected);
  });
});
