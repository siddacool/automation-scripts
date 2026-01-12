import type { ImdbSchema } from './types';

/**
 * Parse IMDb JSON-LD schema from page
 */
export function getImdbSchema(): ImdbSchema {
  const script = document.querySelector<HTMLScriptElement>('[type="application/ld+json"]');
  if (!script) return {};

  try {
    return JSON.parse(script.innerHTML) as ImdbSchema;
  } catch {
    return {};
  }
}
