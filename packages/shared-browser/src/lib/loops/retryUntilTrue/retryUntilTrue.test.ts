import { describe, it, expect, vi } from 'vitest';
import { retryUntilTrue } from './retryUntilTrue.ts';

describe('retryUntilTrue', () => {
  it('resolves immediately if callback returns true on first attempt', async () => {
    const callback = vi.fn(() => true);

    const attempt = await retryUntilTrue(callback, 10, 5);
    expect(attempt).toBe(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('retries until callback returns true', async () => {
    let counter = 0;
    const callback = vi.fn(() => {
      counter++;
      return counter > 3;
    });

    const attempt = await retryUntilTrue(callback, 10, 5);
    expect(attempt).toBe(4);
    expect(counter).toBe(4);
  });

  it('rejects after max tries without success', async () => {
    const callback = vi.fn(() => false);

    await expect(retryUntilTrue(callback, 10, 3)).rejects.toThrow(
      'Callback did not return true after 3 tries.',
    );
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('rejects immediately if callback throws', async () => {
    const callback = vi.fn(() => {
      throw new Error('Callback error');
    });

    await expect(retryUntilTrue(callback, 10, 5)).rejects.toThrow('Callback error');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('respects the interval between attempts', async () => {
    let counter = 0;
    const interval = 50;
    const callback = vi.fn(() => {
      counter++;
      return counter > 2;
    });

    const start = Date.now();
    const attempt = await retryUntilTrue(callback, interval, 5);
    const duration = Date.now() - start;

    expect(attempt).toBe(3);
    expect(duration).toBeGreaterThanOrEqual(interval * 2);
  });
});
