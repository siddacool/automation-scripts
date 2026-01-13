/**
 * Returns a promise that resolves after a given number of milliseconds.
 *
 * @param ms - Delay duration in milliseconds.
 * @returns A promise that resolves after the delay.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
