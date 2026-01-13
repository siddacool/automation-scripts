// ==UserScript==
// @name         YouTube Enhancements
// @namespace    https://github.com/siddacool/automation-scripts/tree/main/scripts/youtube-enhancements
// @version      3.0.5
// @author       siddacool
// @description  a Tampermonkey script to enhance your Youtube viewing experience with features like Enter as play/pause button and more.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.youtube.com/
// @downloadURL  https://raw.githubusercontent.com/siddacool/automation-scripts/gh-pages/packages/youtube-enhancements/youtube-enhancements.user.js
// @updateURL    https://raw.githubusercontent.com/siddacool/automation-scripts/gh-pages/packages/youtube-enhancements/youtube-enhancements.meta.js
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function togglePlayPause() {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      code: "KeyK",
      keyCode: 75,
      which: 75,
      charCode: 75,
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);
  }
  function keyboardShortcutHandler(event) {
    if (document.fullscreenElement === null) return;
    if (!window.location.href.includes("watch")) return;
    if (event.key === "Enter") {
      event.preventDefault();
      togglePlayPause();
    }
  }
  function setupGlobalKeyboardEvents() {
    window.addEventListener("keydown", keyboardShortcutHandler);
    window.addEventListener("beforeunload", () => {
      window.removeEventListener("keydown", keyboardShortcutHandler);
    });
  }
  function main() {
    setupGlobalKeyboardEvents();
  }
  main();

})();