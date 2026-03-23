function extractPages(input: string): number | null {
  const match = input.match(/(\d+)\s*pages/i);
  return match ? parseInt(match[1], 10) : null;
}

export function getPageNumber() {
  const publicationInfo = document.querySelector('[data-testid="pagesFormat"]')?.textContent || '';
  const pages = extractPages(publicationInfo) || 0;

  return pages;
}
