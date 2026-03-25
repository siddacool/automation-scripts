/**
 * Generates a Zettelkasten-style identifier in the format `YYYYMMDDHHmm`.
 *
 * The ID is derived from a JavaScript `Date` object using **local time**.
 * Each component is zero-padded to ensure a fixed-length string.
 *
 * Format breakdown:
 * - YYYY → full year
 * - MM → month (01–12)
 * - DD → day of month (01–31)
 * - HH → hours (00–23)
 * - mm → minutes (00–59)
 *
 * @param date - The date used to generate the Zettel ID
 * @returns A string in the format `YYYYMMDDHHmm`
 *
 * @example
 * generateZettelIdFromDate(new Date('2024-01-05T09:03:00'))
 * // "202401050903"
 */
export function generateZettelIdFromDate(date: Date): string {
  const pad2 = (n: number): string => n.toString().padStart(2, '0');

  return (
    date.getFullYear().toString() +
    pad2(date.getMonth() + 1) +
    pad2(date.getDate()) +
    pad2(date.getHours()) +
    pad2(date.getMinutes())
  );
}
