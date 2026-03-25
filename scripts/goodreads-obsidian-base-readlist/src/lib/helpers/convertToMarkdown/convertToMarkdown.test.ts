import { describe, it, expect } from 'vitest';
import { convertToMarkdown } from './convertToMarkdown';
import type { BookDatabase } from '../../types';

describe('convertToMarkdown', () => {
  const mockData: BookDatabase = {
    title: 'Test Book',
    author: 'John Doe',
    year: 2020,
    poster: 'https://image.jpg',
    genre: ['Fiction', 'Adventure'],
    description: 'Some description',
    createdAt: '2024-01-01',
    zettelId: 'Z123',
    rating: '4.5',
    pageNo: 300,
    pageUrl: 'https://example.com',
  };

  it('should convert book data to markdown correctly', () => {
    const result = convertToMarkdown(mockData);

    expect(result).toContain('Title: Test Book');
    expect(result).toContain('Author: John Doe');
    expect(result).toContain('Published on: 2020');
    expect(result).toContain('Goodreads: 4.5');
    expect(result).toContain('- Fiction');
    expect(result).toContain('- Adventure');
    expect(result).toContain('![poster|200](https://image.jpg)');
    expect(result).toContain('Z123');
  });

  it('should handle empty genre array', () => {
    const data = { ...mockData, genre: [] };

    const result = convertToMarkdown(data);

    expect(result).toContain('tags:\n  -');
  });

  it('should handle missing optional fields safely', () => {
    const data = {} as BookDatabase;

    const result = convertToMarkdown(data);

    expect(result).toContain('Title:');
    expect(result).toContain('Author:');
    expect(result).toContain('tags:');
  });

  it('should include correct markdown structure', () => {
    const result = convertToMarkdown(mockData);

    expect(result.startsWith('---')).toBe(true);
    expect(result).toContain('\n---\n\n# Test Book');
  });
});
