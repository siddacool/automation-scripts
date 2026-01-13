/**
 * Injects CSS styles into the document head.
 *
 * @param {string} css - The CSS string to inject.
 */
export function injectStyles(css: string): void {
  const styleElm = document.createElement('style');
  styleElm.innerText = css;
  document.head.appendChild(styleElm);
}
