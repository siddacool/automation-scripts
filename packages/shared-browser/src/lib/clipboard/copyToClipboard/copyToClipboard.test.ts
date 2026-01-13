/**
 * @file copyToClipboard.test.ts
 * @description Tests for the copyToClipboard function
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyToClipboard } from './copyToClipboard.ts';

describe('copyToClipboard', () => {
  let writeTextSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Ensure navigator.clipboard exists (jsdom or Node environment)
    if (!navigator.clipboard) {
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: async () => {},
        },
        configurable: true,
      });
    }

    // Spy on clipboard.writeText
    writeTextSpy = vi.spyOn(navigator.clipboard, 'writeText');
  });

  afterEach(() => {
    writeTextSpy.mockRestore();
  });

  it('should call navigator.clipboard.writeText with the correct text', async () => {
    writeTextSpy.mockResolvedValue(); // Simulate success
    const text = 'Hello Vitest!';
    await copyToClipboard(text);
    expect(writeTextSpy).toHaveBeenCalledWith(text);
  });

  it('should throw an error if clipboard.writeText fails', async () => {
    const error = new Error('Clipboard failure');
    writeTextSpy.mockRejectedValue(error);

    await expect(copyToClipboard('Fail test')).rejects.toThrow('Clipboard failure');
  });
});
