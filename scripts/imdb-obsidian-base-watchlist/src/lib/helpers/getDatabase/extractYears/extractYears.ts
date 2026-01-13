import type { ImdbDatabaseYears } from '../../../types';

/**
 * Extracts a start and optional end year from a title string.
 *
 * Supports formats such as:
 * - `"Movie Title (1999)"`
 * - `"Movie Title (1999–2003)"`
 * - `"Movie Title (1999-2003)"`
 * - `"Movie Title 1999"`
 *
 * If no year is found, both values will be `undefined`.
 * If only a single year is found, `yearEnd` will be `undefined`.
 *
 * @param title - The title string containing a year or year range
 * @returns An object containing the extracted `yearStart` and optional `yearEnd`
 *
 * @example
 * extractYears("The Matrix (1999)")
 * // { yearStart: 1999, yearEnd: undefined }
 *
 * @example
 * extractYears("Breaking Bad (2008–2013)")
 * // { yearStart: 2008, yearEnd: 2013 }
 */
export function extractYears(title: string): ImdbDatabaseYears {
  const match: RegExpMatchArray | null = title.match(/(\d{4})(?:[–-](\d{4})?)?/);

  return {
    yearStart: match ? Number(match[1]) : undefined,
    yearEnd: match?.[2] ? Number(match[2]) : undefined,
  };
}
