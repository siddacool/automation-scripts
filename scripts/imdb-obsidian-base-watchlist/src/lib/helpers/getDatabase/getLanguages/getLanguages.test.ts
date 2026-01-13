// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { getLanguages } from './getLanguages';

describe('getLanguages', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns English when the languages section is missing', () => {
    expect(getLanguages()).toEqual(['English']);
  });

  it('extracts a single language', () => {
    document.body.innerHTML = `
      <div data-testid="title-details-languages">
        <ul>
          <li>English</li>
        </ul>
      </div>
    `;

    expect(getLanguages()).toEqual(['English']);
  });

  it('extracts multiple languages', () => {
    document.body.innerHTML = `
      <div data-testid="title-details-languages">
        <ul>
          <li>English</li>
          <li>French</li>
          <li>German</li>
        </ul>
      </div>
    `;

    expect(getLanguages()).toEqual(['English', 'French', 'German']);
  });

  it('ignores empty list items', () => {
    document.body.innerHTML = `
      <div data-testid="title-details-languages">
        <ul>
          <li> </li>
          <li>English</li>
        </ul>
      </div>
    `;

    expect(getLanguages()).toEqual(['English']);
  });

  it('falls back to English when list items contain no valid text', () => {
    document.body.innerHTML = `
      <div data-testid="title-details-languages">
        <ul>
          <li></li>
          <li> </li>
        </ul>
      </div>
    `;

    expect(getLanguages()).toEqual(['English']);
  });
});
