// ==UserScript==
// @name        Imdb Obsidian Base Watchlist
// @namespace    https://github.com/siddacool/automation-scripts/tree/main/src/imdb-obsidian-base-watchlist
// @version      1.2.1
// @description  Copy IMDB data to Markdown for Obsidian base.
// @author       Sid
// @match        https://www.imdb.com/title/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=https://www.imdb.com/
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/siddacool/automation-scripts/main/src/imdb-obsidian-base-watchlist/imdb-obsidian-base-watchlist.js
// @updateURL    https://raw.githubusercontent.com/siddacool/automation-scripts/main/src/imdb-obsidian-base-watchlist/imdb-obsidian-base-watchlist.js
// ==/UserScript==

// @ts-check

/**
 * @typedef {Object} ImdbDatabaseYears
 * @property {number} [yearStart]
 * @property {number} [yearEnd]
 */

/**
 * @typedef {Object} ImdbDatabasePosters
 * @property {string} normal
 * @property {string} small
 */

/**
 * @typedef {Object} ImdbDatabase
 * @property {string} name - Name of the Movie/TV show.
 * @property {string} originalName - originalName title for the movie.
 * @property {string} category - category, e.g. Movie, TV Series
 * @property {string} [rating] - IMDB user ratings.
 * @property {string} [certification] - Content certification/rating e.g. PG, R.
 * @property {string[]} genre - genre tags
 * @property {ImdbDatabaseYears} years - Movie Years.
 * @property {string} [runtime] - Movie runtime
 * @property {string} imdbLink - IMDB url
 * @property {string[]} countries - Countries of origin
 * @property {string[]} [languages] - Movie languages
 * @property {string} description - A brief description or synopsis of the movie.
 * @property {ImdbDatabasePosters} posters - The URL for the movie's poster image.
 * @property {string} [createdOn] - created On date and time
 */

/**
 * @typedef {Object} CustomWindow
 * @property {ImdbDatabase | undefined} imdbDatabase
 */

/** @type {CustomWindow & Window} */
window;

// @ts-ignore
window.imdbDatabase = undefined;

/**
 * @typedef {Object} ImdbSchema
 * @property {string} [context] - The JSON-LD context.
 * @property {string} [type] - The schema type, which is "Movie".
 * @property {string} [url] - The URL to the movie's page (e.g., IMDb).
 * @property {string} [name] - The title of the movie.
 * @property {string} [alternateName] - An alternative title for the movie.
 * @property {string} [image] - The URL for the movie's poster image.
 * @property {string} [description] - A brief description or synopsis of the movie.
 * @property {Review} [review] - A review of the movie.
 * @property {AggregateRating} [aggregateRating] - The overall aggregate rating for the movie.
 * @property {string} [contentRating] - The content rating of the movie (e.g., "R", "PG-13").
 * @property {string[]} [genre] - An array of genres the movie belongs to.
 * @property {string} [datePublished] - The date the movie was first released, in "YYYY-MM-DD" format.
 * @property {string} [keywords] - A comma-separated list of keywords associated with the movie.
 * @property {VideoObject} [trailer] - Information about the movie's trailer.
 * @property {Person[]} [actor] - An array of actors who star in the movie.
 * @property {Person[]} [director] - An array of directors of the movie.
 * @property {(Organization | Person)[]} [creator] - An array of creators (production companies or individuals) involved in the movie's creation.
 * @property {string} [duration] - The duration of the movie in ISO 8601 format (e.g., "PT2H").
 */

/**
 * @typedef {Object} Review
 * @property {string} [type] - The schema type, which is "Review".
 * @property {Object} [itemReviewed] - The item being reviewed.
 * @property {string} [itemReviewed.type] - The schema type of the reviewed item, which is "Movie".
 * @property {string} [itemReviewed.url] - The URL of the reviewed item.
 * @property {Person} [author] - The author of the review.
 * @property {string} [dateCreated] - The date the review was created, in "YYYY-MM-DD" format.
 * @property {string} [inLanguage] - The language of the review.
 * @property {string} [name] - The title of the review.
 * @property {string} [reviewBody] - The full body text of the review.
 * @property {Rating} [reviewRating] - The numerical rating given in the review.
 */

/**
 * @typedef {Object} AggregateRating
 * @property {string} [type] - The schema type, which is "AggregateRating".
 * @property {number} [ratingCount] - The total number of ratings.
 * @property {number} [bestRating] - The highest possible rating value.
 * @property {number} [worstRating] - The lowest possible rating value.
 * @property {number} [ratingValue] - The average rating value.
 */

/**
 * @typedef {Object} Rating
 * @property {string} [type] - The schema type, which is "Rating".
 * @property {number} [worstRating] - The lowest possible rating value.
 * @property {number} [bestRating] - The highest possible rating value.
 * @property {number} [ratingValue] - The numerical rating value.
 */

/**
 * @typedef {Object} VideoObject
 * @property {string} [type] - The schema type, which is "VideoObject".
 * @property {string} [name] - The name of the video (e.g., "Official 'Oldboy' Trailer").
 * @property {string} [embedUrl] - The URL to embed the video.
 * @property {ImageObject} [thumbnail] - A thumbnail image for the video.
 * @property {string} [thumbnailUrl] - The URL for the thumbnail image.
 * @property {string} [url] - The URL to the video itself.
 * @property {string} [description] - A description of the video.
 * @property {string} [duration] - The duration of the video in ISO 8601 format (e.g., "PT1M58S").
 * @property {string} [uploadDate] - The date the video was uploaded.
 */

/**
 * @typedef {Object} ImageObject
 * @property {string} [type] - The schema type, which is "ImageObject".
 * @property {string} [contentUrl] - The URL for the image content.
 */

/**
 * @typedef {Object} Person
 * @property {string} [type] - The schema type, which is "Person".
 * @property {string} [url] - The URL to the person's page (e.g., IMDb).
 * @property {string} [name] - The name of the person.
 */

/**
 * @typedef {Object} Organization
 * @property {string} [type] - The schema type, which is "Organization".
 * @property {string} [url] - The URL to the organization's page.
 */

(function () {
  'use strict';

  /**
   * Determines the content category based on the content type.
   * @param {string} contentType - The type of content (e.g., 'TVSeries', 'Movie').
   * @param {string[]} genre - genre tags
   * @returns {string} The category of the content, which will be either 'TV Series' or 'Movie'.
   */
  function getContentCategory(contentType, genre) {
    if (genre.includes('Documentary')) {
      return 'Documentary';
    }

    const genresDirect = document.querySelector('[data-testid="interests"]')?.querySelectorAll('a');

    if (genresDirect) {
      let selectedGenre = '';

      for (let index = 0; index < genresDirect.length; index++) {
        const element = genresDirect[index];

        if (element.innerText.trim() === 'Anime') {
          selectedGenre = 'Anime';
          break;
        }
      }

      if (selectedGenre) {
        return selectedGenre;
      }
    }

    switch (contentType) {
      case 'TVSeries':
        return 'TV Series';
      case 'Movie':
      default:
        return 'Movie';
    }
  }

  /**
   * Generates a string representing the current local date and time in a specific format.
   * The format is 'YYYY-MM-DDTHH:mm:ss', which is a common format for representing local date and time without a timezone offset.
   *
   * @returns {string} The formatted local date and time string.
   */
  function getCurrentLocalDateTime() {
    const dateObj = new Date();

    const pad = (/** @type {number} */ n) => n.toString().padStart(2, '0');

    const year = dateObj.getFullYear();
    const month = pad(dateObj.getMonth() + 1); // Months are 0-based, so add 1
    const day = pad(dateObj.getDate());
    const hours = pad(dateObj.getHours());
    const minutes = pad(dateObj.getMinutes());
    const seconds = pad(dateObj.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  /**
   * Converts an ISO 8601 duration string (e.g., 'PT1H30M') to a human-readable format.
   *
   * @param {string} isoDuration - The duration string in ISO 8601 format.
   * @returns {string | undefined} The formatted duration string, e.g., '1h 30m', or an empty string if the input is invalid.
   */
  function convertIsoDurationToReadable(isoDuration) {
    if (typeof isoDuration !== 'string' || !isoDuration.startsWith('PT')) {
      return undefined;
    }

    // Remove the 'PT' prefix to isolate the duration components
    const duration = isoDuration.substring(2);

    const hoursMatch = duration.match(/(\d+)H/);
    const minutesMatch = duration.match(/(\d+)M/);

    let result = [];

    if (hoursMatch) {
      result.push(`${hoursMatch[1]}h`);
    }

    if (minutesMatch) {
      result.push(`${minutesMatch[1]}m`);
    }

    return result.join(' ');
  }

  /**
   * Retrieves the country of origin for a title from the DOM.
   * It looks for a specific HTML element with the 'data-testid' attribute set to "title-details-origin".
   * The function then extracts the text from the first list item within that element.
   * It returns a standardized country code for 'United States' and 'United Kingdom', otherwise it returns the original text.
   * If the element is not found, it defaults to 'US'.
   *
   * @returns {string[]} Countries of origin as a two-letter code ('US', 'UK') or the full country name.
   */
  function getCountryOfOrigin() {
    const countryOfOriginTag = document
      .querySelector('[data-testid="title-details-origin"]')
      ?.querySelector('ul')
      ?.querySelectorAll('li');

    if (!countryOfOriginTag) {
      return ['US'];
    }

    const stack = [];

    if (countryOfOriginTag) {
      for (let index = 0; index < countryOfOriginTag.length; index++) {
        const element = countryOfOriginTag[index];

        switch (element.innerText.trim()) {
          case 'United States':
            stack.push('US');
            continue;
          case 'United Kingdom':
            stack.push('UK');
            continue;
          default:
            stack.push(element.innerText.trim());
            continue;
        }
      }
    }

    if (!stack.length) {
      return ['US'];
    }

    return stack;
  }

  function getLanguages() {
    const languageTag = document
      .querySelector('[data-testid="title-details-languages"]')
      ?.querySelector('ul')
      ?.querySelectorAll('li');

    if (!languageTag) {
      return ['English'];
    }

    const stack = [];

    if (languageTag) {
      for (let index = 0; index < languageTag.length; index++) {
        const element = languageTag[index];

        stack.push(element.innerText.trim());
      }
    }

    if (!stack.length) {
      return ['English'];
    }

    return stack;
  }

  /**
   * Extracts start and end years from an IMDb title string.
   *
   * @param {string} title - The IMDb title string.
   * @returns {ImdbDatabaseYears}
   *  An object with start and end years (or undefined if missing).
   */
  function extractYears(title) {
    const match = title.match(/(\d{4})(?:[–-](\d{4})?)?/);

    if (!match) {
      return { yearStart: undefined, yearEnd: undefined };
    }

    const yearStart = match[1] ? Number(match[1]) : undefined;
    const yearEnd = match[2] ? Number(match[2]) : undefined;

    return { yearStart, yearEnd };
  }

  /**
   * Cleans text by removing all ":" symbols.
   *
   * @param {string} text - Input string.
   * @returns {string} Cleaned string with ":" removed.
   */
  function cleanText(text) {
    return text.replace(/:/g, '');
  }

  /**
   * getDatabase
   *
   * @returns {ImdbDatabase}
   */
  function getDatabase() {
    /** @type {HTMLScriptElement | null} */
    const schemaTag = document.querySelector('[type="application/ld+json"]');

    /** @type {ImdbSchema} */
    const imdbSchema = JSON.parse(schemaTag?.innerHTML || '{}');

    const genre = imdbSchema.genre || [];
    const name = cleanText(imdbSchema.alternateName || imdbSchema.name || '');
    const originalName = cleanText(imdbSchema.name || '');
    const category = getContentCategory(imdbSchema['@type'] || '', genre);
    const rating = imdbSchema.aggregateRating?.ratingValue?.toString();
    const certification = imdbSchema.contentRating;
    const imdbLink = imdbSchema.url || '';
    const description = imdbSchema.description || '';

    /** @type {ImdbDatabasePosters} */
    const posters = {
      normal: imdbSchema.image || '',
      small: imdbSchema.image?.replace('.jpg', '_UX200_.jpg') || '',
    };
    const createdOn = getCurrentLocalDateTime();
    const runtime = convertIsoDurationToReadable(imdbSchema.duration || '');
    const countries = getCountryOfOrigin();
    const languages = getLanguages();
    const years = extractYears(document.querySelector('title')?.innerText.trim() || '');

    return {
      genre,
      name,
      originalName,
      category,
      rating,
      certification,
      imdbLink,
      description,
      posters,
      createdOn,
      runtime,
      countries,
      languages,
      years,
    };
  }

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
     * Grabs reuired info
     * @private
     * @returns {string} - Returns formatted text
     */
    _getImdbInfo() {
      /** @type {ImdbDatabase | undefined} */
      // @ts-ignore
      const data = window.imdbDatabase;

      const {
        name = '',
        originalName = '',
        category = '',
        rating = '',
        runtime = '',
        certification = '',
        countries = [],
        languages = [],
        imdbLink = '',
        description = '',
        posters,
        createdOn = '',
        genre = [],
        years,
      } = data || {};

      const genreLines = genre.map((/** @type {string} */ item) => `  - ${item}`).join('\n');

      return `---
Name: ${name}
Year: ${years?.yearStart || ''}
pg: ${certification}
Symbol:
Original Name: ${originalName}
Category: ${category}
Language: ${languages[0]}
Country: ${countries[0]}
IMDB: ${rating}
Runtime: ${runtime}
Rotten:
Details: ${imdbLink}
tags:
${genreLines}
Poster: ${posters?.normal || ''}
In Watchlist: true
Watched on:
Created on: ${createdOn}
---
#watchList

# ${name} (${years?.yearStart || ''})

![poster](${posters?.small || ''})

${description}
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
    // @ts-ignore
    window.imdbDatabase = getDatabase();

    createCopyButton();
  }

  // Run main
  main();
})();
