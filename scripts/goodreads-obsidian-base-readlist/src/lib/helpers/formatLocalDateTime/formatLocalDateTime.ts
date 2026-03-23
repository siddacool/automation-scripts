/**
 * Pads a number with leading zeros to 2 digits.
 *
 * @param value - The number to pad
 * @returns A string with at least 2 characters, e.g. 5 -> "05"
 */
function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

/**
 * Formats a Date object as a local ISO-like datetime string.
 *
 * The output format is `YYYY-MM-DDTHH:mm:ss` and uses **local time**.
 * All numeric components are zero-padded to 2 digits.
 *
 * Examples:
 * ```ts
 * formatLocalDateTime(new Date(2024, 0, 5, 9, 3, 7))
 * // "2024-01-05T09:03:07"
 *
 * formatLocalDateTime(new Date(1999, 11, 31, 23, 59, 59))
 * // "1999-12-31T23:59:59"
 * ```
 *
 * @param date - The Date instance to format
 * @returns A string formatted as `YYYY-MM-DDTHH:mm:ss`
 */
export function formatLocalDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  const hours = pad2(date.getHours());
  const minutes = pad2(date.getMinutes());
  const seconds = pad2(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
