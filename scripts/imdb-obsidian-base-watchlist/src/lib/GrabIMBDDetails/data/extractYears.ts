import type { ImdbDatabaseYears } from './types';

/**
 * Extract years from a string like "Movie Title (1999–2003)"
 */
export function extractYears(title: string): ImdbDatabaseYears {
  const match = title.match(/(\d{4})(?:[–-](\d{4})?)?/);
  return {
    yearStart: match ? Number(match[1]) : undefined,
    yearEnd: match && match[2] ? Number(match[2]) : undefined,
  };
}
