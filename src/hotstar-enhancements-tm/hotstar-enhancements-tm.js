// ==UserScript==
// @name         Disney+ Hotstar Enhancements
// @namespace    https://github.com/siddacool/automation-scripts/tree/main/src/hotstar-enhancements-tm
// @version      1.0.5
// @description  Enhance your Disney+ Hotstar viewing experience with features like better subtitles, Enter as play/pause button and more.
// @author       Sid
// @match        https://www.hotstar.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=https://www.hotstar.com/in/
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/siddacool/automation-scripts/main/src/hotstar-enhancements-tm/hotstar-enhancements-tm.js
// @updateURL    https://raw.githubusercontent.com/siddacool/automation-scripts/main/src/hotstar-enhancements-tm/hotstar-enhancements-tm.js
// ==/UserScript==

// @ts-check
(function () {
  'use strict';

  // CSUTOMIZATIONS
  // font size
  const FONT_SIZE = '3.3rem';
  // show/hide logo
  const SHOW_CHANNEL_LOGO = false;

  // LIBARY FUNCTIONS
  /**
   * Creates a promise that resolves after a specified time delay.
   *
   * @param {number} timeInMs - The time delay in milliseconds before the promise resolves.
   * @returns {Promise<void>} A promise that resolves after the specified time delay.
   */
  const timeoutPromise = (timeInMs) => new Promise((resolve) => setTimeout(resolve, timeInMs));

  /**
   * Enhance subtitles.
   *
   * @returns {void}
   */
  function subtitleEnhance() {
    const styleElm = document.createElement('style');

    const suntitleStyles = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

      .shaka-text-container span {
        font-family: 'Roboto', sans-serif !important;
        font-size: ${FONT_SIZE}!important;
        background-color: transparent !important;
        font-weight: 400 !important;
        text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
     }
    `;

    styleElm.innerText = suntitleStyles;

    document.getElementsByTagName('head')[0].appendChild(styleElm);
  }

  /**
   * Hide hotstar logo
   *
   * @returns {void}
   */
  function hideSiteLogo() {
    const styleElm = document.createElement('style');

    const siteLogoStyles = `
     .watermark-content { display: none !important; }
    `;

    styleElm.innerText = siteLogoStyles;
    document.getElementsByTagName('head')[0].appendChild(styleElm);
  }

  /**
   * Keybaord shortcut enhancement
   *
   * @param {KeyboardEvent} event - The time delay in milliseconds before the promise resolves.
   * @returns {void}
   */
  function keybaordShortcutEnhance(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      // Assiagn Enter/Space button for play/pause
      event.preventDefault();

      /**
       * Player window.
       * @type {HTMLElement | null}
       */
      const player =
        document.querySelector('button[aria-label="Play"]') ||
        document.querySelector('button[aria-label="Pause"]') ||
        document.querySelector('.skin-container');

      console.log('keybaordShortcutEnhance', player);

      player?.click();
    }
  }

  /**
   * global keyboard events with cleanup function
   *
   * @returns {void}
   */
  function globalKeybaordEvents() {
    window.addEventListener('keypress', keybaordShortcutEnhance);

    window.addEventListener('beforeunload', () => {
      window.removeEventListener('keypress', keybaordShortcutEnhance);
    });
  }

  /**
   * main function that runs everything.
   *
   * @returns {Promise<void>}
   */
  async function main() {
    globalKeybaordEvents();
    await timeoutPromise(5000);
    subtitleEnhance();

    if (!SHOW_CHANNEL_LOGO) {
      hideSiteLogo();
    }
  }

  // Run main
  main();
})();
