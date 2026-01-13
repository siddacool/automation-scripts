/**
 * Converts an ISO 8601 duration string to a human-readable format.
 *
 * Only supports hour/minute durations in the `PT...H...M` format.
 *
 * Examples:
 * ```ts
 * convertIsoDurationToReadable('PT1H30M'); // "1h 30m"
 * convertIsoDurationToReadable('PT45M');   // "45m"
 * convertIsoDurationToReadable('PT2H');    // "2h"
 * ```
 *
 * @param iso - ISO 8601 duration string (e.g., "PT1H30M")
 * @returns A human-readable string or `undefined` if input is invalid
 */
export function convertIsoDurationToReadable(iso: string | undefined): string | undefined {
  if (!iso?.startsWith('PT')) return undefined;

  const duration = iso.substring(2);
  const hoursMatch = duration.match(/(\d+)H/);
  const minutesMatch = duration.match(/(\d+)M/);

  const parts: string[] = [];
  if (hoursMatch) parts.push(`${hoursMatch[1]}h`);
  if (minutesMatch) parts.push(`${minutesMatch[1]}m`);

  return parts.join(' ');
}
