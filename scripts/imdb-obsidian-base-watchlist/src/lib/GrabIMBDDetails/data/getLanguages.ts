/**
 * Fallback languages extractor
 */
export function getLanguages(): string[] {
  const nodes = document
    .querySelector('[data-testid="title-details-languages"]')
    ?.querySelectorAll('ul li');
  if (!nodes || !nodes.length) return ['English'];
  const langs: string[] = [];
  nodes.forEach((el) => {
    const txt = el.textContent?.trim();
    if (txt) langs.push(txt);
  });
  return langs.length ? langs : ['English'];
}
