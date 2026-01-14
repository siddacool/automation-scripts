import { delay } from '../../time/delay/delay.js';

/**
 * Repeatedly runs a callback function until it returns `true` or max tries are exhausted.
 *
 * @param callback - A function that returns a boolean or a Promise<boolean>
 * @param interval - Time in milliseconds to wait between retries (default: 2000)
 * @param maxTries - Maximum number of attempts (default: 25)
 * @param attempt - Current attempt number (internal use)
 * @returns Promise<number> - Resolves with the attempt number on success, rejects after max tries
 */
export async function retryUntilTrue(
  callback: () => boolean | Promise<boolean>,
  interval: number = 2000,
  maxTries: number = 25,
  attempt: number = 1,
): Promise<number> {
  try {
    const result = await callback();

    if (result) {
      return Promise.resolve(attempt); // resolve with attempt number
    }

    if (attempt >= maxTries) {
      return Promise.reject(new Error(`Callback did not return true after ${maxTries} tries.`));
    }

    await delay(interval); // wait before next attempt
    return retryUntilTrue(callback, interval, maxTries, attempt + 1);
  } catch (err) {
    return Promise.reject(err); // reject immediately if callback throws
  }
}
