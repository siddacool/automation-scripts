/**
 * Decode HTML entities
 */
export function decodeHtmlEntities(text?: string): string {
  if (!text) return '';
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

/**
 * Format date as YYYY-MM-DDTHH:mm:ss
 */
export function formatLocalDateTime(date: Date): string {
  const pad2 = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
    date.getDate(),
  )}T${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

/**
 * Convert ISO 8601 duration to human-readable string
 * e.g., PT1H30M -> "1h 30m"
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

/**
 * Clean text by removing colons
 */
export function cleanText(text: string): string {
  return text.replace(/:/g, '');
}
