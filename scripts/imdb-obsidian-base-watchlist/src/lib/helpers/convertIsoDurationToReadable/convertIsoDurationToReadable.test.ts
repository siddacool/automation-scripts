import { describe, it, expect } from 'vitest';
import { convertIsoDurationToReadable } from './convertIsoDurationToReadable';

describe('convertIsoDurationToReadable', () => {
  it('converts hours and minutes', () => {
    expect(convertIsoDurationToReadable('PT1H30M')).toBe('1h 30m');
  });

  it('converts only hours', () => {
    expect(convertIsoDurationToReadable('PT2H')).toBe('2h');
  });

  it('converts only minutes', () => {
    expect(convertIsoDurationToReadable('PT45M')).toBe('45m');
  });

  it('returns undefined for invalid input', () => {
    expect(convertIsoDurationToReadable('')).toBeUndefined();
    expect(convertIsoDurationToReadable('1H30M')).toBeUndefined();
    expect(convertIsoDurationToReadable(undefined)).toBeUndefined();
  });

  it('handles edge cases', () => {
    expect(convertIsoDurationToReadable('PT0H0M')).toBe('0h 0m');
  });
});
