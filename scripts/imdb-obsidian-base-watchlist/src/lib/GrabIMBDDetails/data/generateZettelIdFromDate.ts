/**
 * Generate Zettel-style ID YYYYMMDDHHmm
 */
export function generateZettelIdFromDate(date: Date): string {
  const pad2 = (n: number) => n.toString().padStart(2, '0');
  return (
    date.getFullYear().toString() +
    pad2(date.getMonth() + 1) +
    pad2(date.getDate()) +
    pad2(date.getHours()) +
    pad2(date.getMinutes())
  );
}
