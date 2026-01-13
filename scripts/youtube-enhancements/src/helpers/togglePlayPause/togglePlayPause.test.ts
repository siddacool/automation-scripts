// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import togglePlayPause from './togglePlayPause';

describe('togglePlayPause', () => {
  let dispatchEventSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spy on document.dispatchEvent
    dispatchEventSpy = vi.spyOn(document, 'dispatchEvent');
  });

  afterEach(() => {
    dispatchEventSpy.mockRestore();
  });

  it('should dispatch a KeyboardEvent with key "k"', () => {
    togglePlayPause();

    expect(dispatchEventSpy).toHaveBeenCalledTimes(1);

    const event = dispatchEventSpy.mock.calls[0][0] as KeyboardEvent;
    expect(event).toBeInstanceOf(KeyboardEvent);
    expect(event.key).toBe('k');
    expect(event.code).toBe('KeyK');
    expect(event.bubbles).toBe(true);
    expect(event.cancelable).toBe(true);
  });
});
