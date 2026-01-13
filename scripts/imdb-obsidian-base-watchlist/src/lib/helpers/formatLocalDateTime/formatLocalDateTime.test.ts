import { describe, it, expect } from 'vitest';
import { formatLocalDateTime } from './formatLocalDateTime';

describe('formatLocalDateTime', () => {
  it('formats a full date and time correctly', () => {
    const date = new Date(2024, 0, 5, 9, 3, 7); // Jan 5, 09:03:07
    expect(formatLocalDateTime(date)).toBe('2024-01-05T09:03:07');
  });

  it('pads single-digit month, day, hours, minutes, and seconds', () => {
    const date = new Date(2023, 8, 1, 2, 4, 6); // Sep 1, 02:04:06
    expect(formatLocalDateTime(date)).toBe('2023-09-01T02:04:06');
  });

  it('handles end-of-year date correctly', () => {
    const date = new Date(1999, 11, 31, 23, 59, 59); // Dec 31, 23:59:59
    expect(formatLocalDateTime(date)).toBe('1999-12-31T23:59:59');
  });

  it('always returns a string of length 19', () => {
    const date = new Date();
    const result = formatLocalDateTime(date);
    expect(result).toHaveLength(19);
  });

  it('works for midnight correctly', () => {
    const date = new Date(2024, 0, 1, 0, 0, 0); // Jan 1, 00:00:00
    expect(formatLocalDateTime(date)).toBe('2024-01-01T00:00:00');
  });
});
