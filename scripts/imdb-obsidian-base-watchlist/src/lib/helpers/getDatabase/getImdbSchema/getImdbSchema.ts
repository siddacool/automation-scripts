import type { ImdbSchema } from '../../../types';

/**
 * Extracts and parses the IMDb JSON-LD schema embedded in the page.
 *
 * IMDb exposes structured metadata using a `<script type="application/ld+json">`
 * tag. This function locates the first such script and attempts to parse its
 * contents as JSON.
 *
 * Fallback behavior:
 * - Returns an empty object if the script tag is missing
 * - Returns an empty object if the JSON is invalid or cannot be parsed
 *
 * ⚠️ This function depends on the browser DOM and must be executed
 * in a browser or DOM-enabled test environment (e.g. jsdom).
 *
 * @returns A parsed IMDb schema object or an empty object on failure
 *
 * @example
 * getImdbSchema()
 * // { "@type": "Movie", "name": "Inception", ... }
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
