// @vitest-environment jsdom

import { describe, it, expect, beforeEach } from 'vitest';
import { extractYear, getYear } from './getYear';

describe('extractYear', () => {
  it('extracts year correctly', () => {
    expect(extractYear('Published June 5, 2020')).toBe(2020);
  });

  it('handles extra whitespace', () => {
    expect(extractYear('Published Jan 1,   1999')).toBe(1999);
  });

  it('returns 0 if year is missing', () => {
    expect(extractYear('Published June 5')).toBe(0);
  });

  it('returns 0 for invalid input', () => {
    expect(extractYear('Invalid text')).toBe(0);
  });

  it('handles empty string', () => {
    expect(extractYear('')).toBe(0);
  });
});

describe('getYear', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns 0 when element is missing', () => {
    expect(getYear()).toBe(0);
  });

  it('extracts year from DOM', () => {
    document.body.innerHTML = `
      <div data-testid="publicationInfo">Published June 5, 2020</div>
    `;

    expect(getYear()).toBe(2020);
  });

  it('returns 0 for invalid DOM content', () => {
    document.body.innerHTML = `
      <div data-testid="publicationInfo">Unknown</div>
    `;

    expect(getYear()).toBe(0);
  });
});
