// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { decodeHtmlEntities } from './decodeHtmlEntities';

describe('decodeHtmlEntities', () => {
  it('decodes common HTML entities', () => {
    expect(decodeHtmlEntities('Tom &amp; Jerry')).toBe('Tom & Jerry');
  });

  it('decodes angle brackets', () => {
    expect(decodeHtmlEntities('&lt;div&gt;Hello&lt;/div&gt;')).toBe('<div>Hello</div>');
  });

  it('decodes quotes', () => {
    expect(decodeHtmlEntities('&quot;Hello&quot; &#39;World&#39;')).toBe('"Hello" \'World\'');
  });

  it('returns empty string for undefined input', () => {
    expect(decodeHtmlEntities(undefined)).toBe('');
  });

  it('returns empty string for empty input', () => {
    expect(decodeHtmlEntities('')).toBe('');
  });

  it('handles strings without HTML entities', () => {
    expect(decodeHtmlEntities('Plain text')).toBe('Plain text');
  });
});
