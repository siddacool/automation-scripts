import { describe, it, expect } from 'vitest';
import { cleanText } from './cleanText';

describe('cleanText', () => {
  it('removes single colon', () => {
    expect(cleanText('12:34')).toBe('1234');
  });

  it('removes multiple colons', () => {
    expect(cleanText('12:34:56')).toBe('123456');
  });

  it('removes colons in text', () => {
    expect(cleanText('Time: 12:34')).toBe('Time 1234');
  });

  it('does nothing if no colon', () => {
    expect(cleanText('Hello World')).toBe('Hello World');
  });

  it('works with empty string', () => {
    expect(cleanText('')).toBe('');
  });
});
