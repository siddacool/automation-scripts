import { describe, it, expect } from 'vitest';
import { extractYears } from './extractYears';

describe('extractYears', () => {
  it('extracts a single year', () => {
    expect(extractYears('The Matrix (1999)')).toEqual({
      yearStart: 1999,
      yearEnd: undefined,
    });
  });

  it('extracts a year range with en dash', () => {
    expect(extractYears('Breaking Bad (2008–2013)')).toEqual({
      yearStart: 2008,
      yearEnd: 2013,
    });
  });

  it('extracts a year range with hyphen', () => {
    expect(extractYears('Some Show (2001-2004)')).toEqual({
      yearStart: 2001,
      yearEnd: 2004,
    });
  });

  it('extracts year without parentheses', () => {
    expect(extractYears('Movie Title 2010')).toEqual({
      yearStart: 2010,
      yearEnd: undefined,
    });
  });

  it('returns undefined when no year is present', () => {
    expect(extractYears('Some Random Title')).toEqual({
      yearStart: undefined,
      yearEnd: undefined,
    });
  });

  it('handles open-ended ranges like (2015–)', () => {
    expect(extractYears('Ongoing Series (2015–)')).toEqual({
      yearStart: 2015,
      yearEnd: undefined,
    });
  });
});
