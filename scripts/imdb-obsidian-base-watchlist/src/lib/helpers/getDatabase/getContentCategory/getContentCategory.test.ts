// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { getContentCategory } from './getContentCategory';

describe('getContentCategory', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns Documentary when genre includes Documentary', () => {
    expect(getContentCategory('Movie', ['Action', 'Documentary'])).toBe('Documentary');
  });

  it('detects Anime from the DOM interests section', () => {
    document.body.innerHTML = `
      <div data-testid="interests">
        <a>Drama</a>
        <a>Anime</a>
      </div>
    `;

    expect(getContentCategory('TVSeries', [])).toBe('Anime');
  });

  it('returns TV Series for TVSeries content type', () => {
    expect(getContentCategory('TVSeries', [])).toBe('TV Series');
  });

  it('defaults to Movie for Movie content type', () => {
    expect(getContentCategory('Movie', [])).toBe('Movie');
  });

  it('defaults to Movie for unknown content types', () => {
    expect(getContentCategory('ShortFilm', [])).toBe('Movie');
  });

  it('does not crash if interests section is missing', () => {
    expect(getContentCategory('Movie', [])).toBe('Movie');
  });
});
