// ==UserScript==
// @name        Imdb Obsidian Base Watchlist
// @namespace    https://github.com/siddacool/automation-scripts/tree/main/src/imdb-obsidian-base-watchlist
// @version      1.0.0
// @description  Copy IMDB data to Markdown for Obsidian base.
// @author       Sid
// @match        https://www.imdb.com/title/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=https://www.imdb.com/
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/siddacool/automation-scripts/main/src/imdb-obsidian-base-watchlist/imdb-obsidian-base-watchlist.js
// @updateURL    https://raw.githubusercontent.com/siddacool/automation-scripts/main/src/imdb-obsidian-base-watchlist/imdb-obsidian-base-watchlist.js
// ==/UserScript==

// @ts-check
(function () {
  'use strict';

  /**
   * @typedef {Object} MovieInfo
   * @property {string} name
   * @property {string} year
   * @property {string} rating
   * @property {string[]} tags
   */

  /**
   * MarkdownLinkCopyButton
   * @extends {HTMLElement}
   */
  class MarkdownLinkCopyButton extends HTMLElement {
    /**
     * Creates an instance of CustomButton.
     * @constructor
     */
    constructor() {
      super();
      /**
       * The Shadow DOM of the component.
       * @type {ShadowRoot}
       * @private
       */
      this._shadowRoot = this.attachShadow({ mode: 'open' });

      // Attach a click event listener to the internal button
      this._handleOnClick = this._handleOnClick.bind(this);
    }

    connectedCallback() {
      this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          position: relative;
        }

        button {
          width: 35px;
          height: 35px;
          display: flex;
          background: transparent;
          border: 0;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 50%;
          transition: all 100ms;
          color: #fff;
          position: relative;
          top: 3px;
        }

        button:hover {
          color: #f5c518;
          background: rgb(0 0 0 / 25%);
        }

        button:active {
          color: #f5c518;
          background: rgb(0 0 0 / 35%);
        }

        svg {
          display: inline-flex;
          width: 20px;
          height: 20px;
          transition: all 100ms;
          fill: currentColor;
        }

        .text-copied-message {
          position: absolute;
          transition: all 600ms;
          top: 36px;
          left: -7px;
          font-size: 0.8rem;
          width: 55px;
          background-color: #000;
          height: 30px;
          display: none;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }

        .text-copied-message.show {
          display: flex;
        }
      </style>

      <button id="internalButton" title="Copy title">
        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 18v3c0 .621.52 1 1 1h14c.478 0 1-.379 1-1V7c0-.478-.379-1-1-1h-3V3c0-.478-.379-1-1-1H3c-.62 0-1 .519-1 1v14c0 .621.52 1 1 1zM16.5 6H7c-.62 0-1 .519-1 1v9.5H3.5v-13h13z" fill-rule="nonzero"/>
        </svg>
      </button>

      <span class="text-copied-message">Copied</span>
    `;

      // Select the internal button and attach the click event listener
      this._internalButton = this._shadowRoot.getElementById('internalButton');

      // Click event
      this._internalButton?.addEventListener('click', this._handleOnClick);
    }

    /**
     * Extract movie information (name, year, rating, tags) from a formatted string.
     * Example: "Happy as Lazzaro (2018) ⭐ 7.5 | Drama, Fantasy, Mystery"
     * @private
     * @param {string} inputString - The input string containing movie details.
     * @returns {MovieInfo|null} - The extracted movie information or null if not matched.
     */
    _parseMovieInfo(inputString) {
      const regex = /^(.*?)\s*\((?:.*? )?(\d{4})(?:[–-]\d{0,4})?\)\s*⭐\s*([\d.]+)\s*\|\s*(.+)$/i;
      const match = inputString.match(regex);

      if (!match) return null;

      const [, name, year, rating, tagsStr] = match;
      const tags = tagsStr.split(',').map((tag) => tag.trim());

      return {
        name: name.trim(),
        year, // always first year only
        rating,
        tags,
      };
    }

    /**
     * Copy text to the clipboard.
     * @private
     * @param {string} text - The text to be copied.
     * @returns {Promise<void>} - A Promise that resolves when the text is copied successfully.
     */
    async _copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard:', text);
      } catch (err) {
        console.error('Unable to copy text to clipboard.', err);
      }
    }

    /**
     * Extract runtime and rating/certification from a string like "1h | TV-MA".
     *
     * @private
     * @param {string} inputString - The input string containing runtime and certification.
     * @returns {{runtime: string, certification: string}|null} - Extracted data or null if parsing fails.
     */
    _extractRuntimeAndCertification(inputString) {
      if (!inputString.includes('|')) return null;

      const [runtime, certification] = inputString.split('|').map((s) => s.trim());

      return {
        runtime,
        certification,
      };
    }

    /**
     * Replace the Amazon image size marker `_UX<number>_` with `_UX200_`.
     *
     * @private
     * @param {string} url - The Amazon image URL.
     * @returns {string} - The modified URL with `_UX200_`.
     */
    _replaceAmazonImageSize(url) {
      return url.replace(/_UX\d+_/, '_UX200_');
    }

    /**
     * Grabs reuired info
     * @private
     * @returns {string} - Returns formatted text
     */
    _getImdbInfo() {
      const imdbLink =
        document.querySelector('meta[property="og:url"]')?.getAttribute('content') || '';

      const titleOgTag =
        document.querySelector('[property="og:title"]')?.getAttribute('content') || '';

      const {
        name = '',
        year = '',
        rating = '',
        tags = [],
      } = this._parseMovieInfo(titleOgTag) || {};

      const tagLines = tags.map((tag) => `  - ${tag}`).join('\n');

      const descriptionOgTag =
        document.querySelector('[property="og:description"]')?.getAttribute('content') || '';

      const { certification = '', runtime = '' } =
        this._extractRuntimeAndCertification(descriptionOgTag) || {};

      const poster = document.querySelector('[property="og:image"]')?.getAttribute('content') || '';

      const smallPoster = this._replaceAmazonImageSize(poster);

      return `---
Year: ${year}
pg: ${certification}
Symbol:
Category: Movie
Language: English
Country: US
IMDB: ${rating}
Runtime: ${runtime}
Rotten:
Details: ${imdbLink}
tags:
${tagLines}
Poster: ${poster}
Saved: true
Watched on:
---
#watchList

# ${name} (${year})

![poster](${smallPoster})
`;
    }

    /**
     * Handles the click event of the internal button.
     * @private
     */
    _handleOnClick() {
      const textToCopy = this._getImdbInfo();

      this._copyToClipboard(textToCopy);

      const textCopiedMessage = this._shadowRoot.querySelector('.text-copied-message');

      textCopiedMessage?.classList.add('show');

      setTimeout(() => {
        textCopiedMessage?.classList.remove('show');
      }, 1500);
    }
  }

  customElements.define('markdown-link-copy-button', MarkdownLinkCopyButton);

  /**
   * Create Copy Button
   *
   * @returns {void}
   */
  function createCopyButton() {
    // Create Copy Button Element
    const markdownLinkCopyButton = document.createElement('markdown-link-copy-button');

    const titleElement = document.querySelector('[data-testid="hero__pageTitle"]');

    titleElement?.setAttribute(
      'style',
      `
      display: flex;
      align-items: center;
    `,
    );

    // Add Copy Button Element
    titleElement?.appendChild(markdownLinkCopyButton);
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
