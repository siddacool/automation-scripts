// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { getCountryOfOrigin } from './getCountryOfOrigin';

describe('getCountryOfOrigin', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns US when the origin section is missing', () => {
    expect(getCountryOfOrigin()).toEqual(['US']);
  });

  it('extracts and normalizes United States', () => {
    document.body.innerHTML = `
      <div data-testid="title-details-origin">
        <ul>
          <li>United States</li>
        </ul>
      </div>
    `;

    expect(getCountryOfOrigin()).toEqual(['US']);
  });

  it('extracts and normalizes United Kingdom', () => {
    document.body.innerHTML = `
      <div data-testid="title-details-origin">
        <ul>
          <li>United Kingdom</li>
        </ul>
      </div>
    `;

    expect(getCountryOfOrigin()).toEqual(['UK']);
  });

  it('returns multiple countries', () => {
    document.body.innerHTML = `
      <div data-testid="title-details-origin">
        <ul>
          <li>United States</li>
          <li>Canada</li>
          <li>France</li>
        </ul>
      </div>
    `;

    expect(getCountryOfOrigin()).toEqual(['US', 'Canada', 'France']);
  });

  it('ignores empty list items', () => {
    document.body.innerHTML = `
      <div data-testid="title-details-origin">
        <ul>
          <li> </li>
          <li>United States</li>
        </ul>
      </div>
    `;

    expect(getCountryOfOrigin()).toEqual(['US']);
  });

  it('falls back to US when list items contain no valid text', () => {
    document.body.innerHTML = `
      <div data-testid="title-details-origin">
        <ul>
          <li></li>
          <li> </li>
        </ul>
      </div>
    `;

    expect(getCountryOfOrigin()).toEqual(['US']);
  });
});
