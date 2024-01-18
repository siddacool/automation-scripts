// ==UserScript==
// @name         Youtube Enhancements
// @namespace    https://github.com/siddacool/automation-scripts/tree/main/src/youtube-enhancements-tm
// @version      1.0.1
// @description  Enhance your Youtube viewing experience with features like Enter as play/pause button and more.
// @author       Sid
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.youtube.com/
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/siddacool/automation-scripts/main/src/youtube-enhancements-tm/youtube-enhancements-tm.js
// @updateURL    https://raw.githubusercontent.com/siddacool/automation-scripts/main/src/youtube-enhancements-tm/youtube-enhancements-tm.js
// ==/UserScript==

// @ts-check
(function () {
  'use strict';

  /**
   * Handles the Enter key press event and triggers a simulated Space key press.
   * @param {KeyboardEvent} event - The keyboard event object.
   */
  function keybaordShortcutEnhance(event) {
    // ignore if not fullscreen
    if (document.fullscreenElement === null) {
      return;
    }

    // ignore if not watch screen
    if (!window.location.href.includes('watch')) {
      return;
    }

    if (event.key === 'Enter') {
      // Assiagn Enter button for play/pause
      event.preventDefault();

      /**
       * Player window.
       * @type {HTMLElement | null}
       */
      const player = document.querySelector('video.video-stream.html5-main-video');

      if (!player) {
        console.error('Player not found');
        return;
      }

      player.click();
    }
  }

  /**
   * global keyboard events with cleanup function
   *
   * @returns {void}
   */
  function globalKeybaordEvents() {
    window.addEventListener('keydown', keybaordShortcutEnhance);

    window.addEventListener('beforeunload', () => {
      window.removeEventListener('keydown', keybaordShortcutEnhance);
    });
  }

  /**
   * main function that runs everything.
   *
   * @returns {void}
   */
  function main() {
    globalKeybaordEvents();
  }

  // Run main
  main();
})();
