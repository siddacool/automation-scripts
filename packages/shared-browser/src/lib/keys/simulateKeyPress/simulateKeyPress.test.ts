// @vitest-environment jsdom

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import simulateKeyPress from './simulateKeyPress.ts';

describe('simulateKeyPress', () => {
  let dispatchEventSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spy on document.dispatchEvent
    dispatchEventSpy = vi.spyOn(document, 'dispatchEvent');
  });

  afterEach(() => {
    // Restore spy
    dispatchEventSpy.mockRestore();
  });

  it('should dispatch a KeyboardEvent with the correct single-character key', () => {
    simulateKeyPress('k');

    expect(dispatchEventSpy).toHaveBeenCalledTimes(1);
    const event = dispatchEventSpy.mock.calls[0][0] as KeyboardEvent;

    expect(event).toBeInstanceOf(KeyboardEvent);
    expect(event.key).toBe('k');
    expect(event.code).toBe('KeyK');
    expect(event.bubbles).toBe(true);
    expect(event.cancelable).toBe(true);
  });

  it('should dispatch a KeyboardEvent with a special key', () => {
    simulateKeyPress('Enter');

    expect(dispatchEventSpy).toHaveBeenCalledTimes(1);
    const event = dispatchEventSpy.mock.calls[0][0] as KeyboardEvent;

    expect(event.key).toBe('Enter');
    expect(event.code).toBe('KeyENTER'); // uppercased by function
  });

  it('should dispatch multiple different keys correctly', () => {
    simulateKeyPress('a');
    simulateKeyPress('b');

    expect(dispatchEventSpy).toHaveBeenCalledTimes(2);

    const firstEvent = dispatchEventSpy.mock.calls[0][0] as KeyboardEvent;
    const secondEvent = dispatchEventSpy.mock.calls[1][0] as KeyboardEvent;

    expect(firstEvent.key).toBe('a');
    expect(firstEvent.code).toBe('KeyA');

    expect(secondEvent.key).toBe('b');
    expect(secondEvent.code).toBe('KeyB');
  });
});
