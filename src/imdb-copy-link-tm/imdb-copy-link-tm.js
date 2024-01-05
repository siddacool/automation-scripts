// ==UserScript==
// @name         IMDB Copy Markdown Link
// @namespace    https://github.com/siddacool/automation-scripts/tree/main/src/imdb-copy-link-tm
// @version      1.0.1
// @description  Copy imdb link in markdown format.
// @author       Sid
// @match        https://www.imdb.com/title/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=https://www.imdb.com/
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/siddacool/automation-scripts/main/src/imdb-copy-link-tm/imdb-copy-link-tm.js
// @updateURL    https://raw.githubusercontent.com/siddacool/automation-scripts/main/src/imdb-copy-link-tm/imdb-copy-link-tm.js
// ==/UserScript==

// @ts-check
(function () {
  'use strict';

  /**
   * Remove everything except numbers and '-' symbol from the input string.
   *
   * @param {string} inputString - The input string containing numbers and '-' symbol.
   * @returns {string} - The string with only numbers and '-' symbol.
   */
  function removeNonNumeric(inputString) {
    return inputString.replace(/[^\d–-]/g, '');
  }

  /**
   * Copy text to the clipboard.
   *
   * @param {string} text - The text to be copied.
   * @returns {Promise<void>} - A Promise that resolves when the text is copied successfully.
   */
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard:', text);
    } catch (err) {
      console.error('Unable to copy text to clipboard.', err);
    }
  }

  /**
   * Create Markdown Link
   *
   * @returns {void}
   */
  function createMarkdownLink() {
    const titleElement = document.querySelector('[data-testid="hero__pageTitle"]');
    const title = titleElement?.textContent?.trim();

    const titleTagRaw = document.querySelector('title');
    const filterMainTitle =
      titleTagRaw?.textContent?.trim().replace(`${title} `, '').replace(' - IMDb', '') || '';
    const year = removeNonNumeric(filterMainTitle) || '';
    const formatedYear = year ? `(${year})` : '';

    const openGraphUrlTag = document.querySelector('meta[property="og:url"]');
    const url = openGraphUrlTag?.getAttribute('content') || '';

    copyToClipboard(`[${title} ${formatedYear}](${url})`);
  }

  /**
   * Create Copy Button
   *
   * @returns {void}
   */
  function createCopyButton() {
    const styleElm = document.createElement('style');

    const globalStyles = `
      .MarkdownLinkCopyButton {
        font-size: 1rem;
        padding: 5px;
        display: inline-flex;
        background: transparent;
        border: 0;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 3px;
        transition: all 100ms;
        transform: scale(1.0);
     }

    .MarkdownLinkCopyButton img {
      display: inline-flex;
      width: 20px;
      height: 20px;
      transition: all 100ms;
   }

     .MarkdownLinkCopyButton:hover {
        background: #f5c518;
        transform: scale(1.1);
     }

     .MarkdownLinkCopyButton:active {
        background: #f5c518;
        transform: scale(0.9);
     }

    .MarkdownLinkCopyButton:hover img {
      filter: invert(1);
    }

    .MarkdownLinkCopyButton:active img {
      filter: invert(1);
    }
    `;

    styleElm.innerText = globalStyles;

    document.getElementsByTagName('head')[0].appendChild(styleElm);

    // Create Copy Button Element
    const copyButtonElement = document.createElement('button');

    copyButtonElement.classList.add('MarkdownLinkCopyButton');

    copyButtonElement.addEventListener('click', createMarkdownLink);

    // Create image Element
    const imageElement = document.createElement('img');

    imageElement.setAttribute(
      'src',
      'https://raw.githubusercontent.com/siddacool/automation-scripts/main/src/imdb-copy-link-tm/resources/copy-icon.svg',
    );

    imageElement.setAttribute('alt', 'Copy');

    copyButtonElement.appendChild(imageElement);

    const titleElement = document.querySelector('[data-testid="hero__pageTitle"]');

    titleElement?.setAttribute(
      'style',
      `
      display: flex;
      align-items: center;
    `,
    );

    // Add Copy Button Element
    titleElement?.appendChild(copyButtonElement);
  }

  /**
   * main function that runs everything.
   *
   * @returns {void}
   */
  function main() {
    createCopyButton();
  }

  // Run main
  main();
})();
