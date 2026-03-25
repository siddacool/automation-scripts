// @vitest-environment jsdom

import { describe, it, expect, beforeEach } from 'vitest';
import { extractPages, getPageNumber } from './getPageNo';

describe('extractPages', () => {
  it('extracts page number correctly', () => {
    expect(extractPages('320 pages')).toBe(320);
    expect(extractPages('About 250 Pages')).toBe(250);
  });

  it('handles extra whitespace', () => {
    expect(extractPages('  500    pages  ')).toBe(500);
  });

  it('returns null when no page info exists', () => {
    expect(extractPages('No page info')).toBeNull();
  });

  it('returns null for invalid formats', () => {
    expect(extractPages('pages 300')).toBeNull();
    expect(extractPages('300pg')).toBeNull();
  });

  it('extracts number from mixed content', () => {
    expect(extractPages('Hardcover • 450 pages')).toBe(450);
  });
});

describe('getPageNumber', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns 0 when element is missing', () => {
    expect(getPageNumber()).toBe(0);
  });

  it('extracts page number from DOM', () => {
    document.body.innerHTML = `
      <div data-testid="pagesFormat">320 pages</div>
    `;

    expect(getPageNumber()).toBe(320);
  });

  it('returns 0 when content is invalid', () => {
    document.body.innerHTML = `
      <div data-testid="pagesFormat">Unknown</div>
    `;

    expect(getPageNumber()).toBe(0);
  });

  it('handles mixed text content', () => {
    document.body.innerHTML = `
      <div data-testid="pagesFormat">Paperback • 450 pages</div>
    `;

    expect(getPageNumber()).toBe(450);
  });

  it('handles empty element safely', () => {
    document.body.innerHTML = `
      <div data-testid="pagesFormat"></div>
    `;

    expect(getPageNumber()).toBe(0);
  });
});
