/**
 * Fallback country extractor
 */
export function getCountryOfOrigin(): string[] {
  const nodes = document
    .querySelector('[data-testid="title-details-origin"]')
    ?.querySelectorAll('ul li');
  if (!nodes || !nodes.length) return ['US'];

  const countries: string[] = [];
  nodes.forEach((el) => {
    const txt = el.textContent?.trim();
    if (!txt) return;
    if (txt === 'United States') countries.push('US');
    else if (txt === 'United Kingdom') countries.push('UK');
    else countries.push(txt);
  });
  return countries.length ? countries : ['US'];
}
