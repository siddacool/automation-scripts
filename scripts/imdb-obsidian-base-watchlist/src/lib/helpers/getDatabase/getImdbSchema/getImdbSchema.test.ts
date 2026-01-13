// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { getImdbSchema } from './getImdbSchema';

describe('getImdbSchema', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns empty object when schema script is missing', () => {
    expect(getImdbSchema()).toEqual({});
  });

  it('parses valid JSON-LD schema', () => {
    document.body.innerHTML = `
      <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Movie",
          "name": "Inception",
          "datePublished": "2010"
        }
      </script>
    `;

    const schema = getImdbSchema();

    expect(schema).toMatchObject({
      '@type': 'Movie',
      name: 'Inception',
      datePublished: '2010',
    });
  });

  it('returns empty object when JSON is invalid', () => {
    document.body.innerHTML = `
      <script type="application/ld+json">
        { invalid json }
      </script>
    `;

    expect(getImdbSchema()).toEqual({});
  });

  it('ignores non-JSON-LD scripts', () => {
    document.body.innerHTML = `
      <script type="application/json">
        { "foo": "bar" }
      </script>
    `;

    expect(getImdbSchema()).toEqual({});
  });
});
