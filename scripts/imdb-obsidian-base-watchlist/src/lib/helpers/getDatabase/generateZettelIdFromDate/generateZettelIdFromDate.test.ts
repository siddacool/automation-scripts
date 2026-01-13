import { describe, it, expect } from 'vitest';
import { generateZettelIdFromDate } from './generateZettelIdFromDate';

describe('generateZettelIdFromDate', () => {
  it('generates a valid Zettel ID', () => {
    const date = new Date(2024, 0, 5, 9, 3); // Jan is 0
    expect(generateZettelIdFromDate(date)).toBe('202401050903');
  });

  it('pads single-digit values correctly', () => {
    const date = new Date(2023, 8, 1, 2, 4); // Sep 1, 02:04
    expect(generateZettelIdFromDate(date)).toBe('202309010204');
  });

  it('handles end-of-year dates', () => {
    const date = new Date(1999, 11, 31, 23, 59);
    expect(generateZettelIdFromDate(date)).toBe('199912312359');
  });

  it('always returns a 12-character string', () => {
    const date = new Date();
    expect(generateZettelIdFromDate(date)).toHaveLength(12);
  });
});
