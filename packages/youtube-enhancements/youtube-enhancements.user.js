// ==UserScript==
// @name         YouTube Enhancements
// @namespace    https://github.com/siddacool/automation-scripts/tree/main/scripts/youtube-enhancements
// @version      3.4.2
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

  function simulateKeyPress(key) {
    const keyCode = key.length === 1 ? key.toUpperCase().charCodeAt(0) : 0;
    const event = new KeyboardEvent("keydown", {
      key,
      code: `Key${key.toUpperCase()}`,
      keyCode,
      which: keyCode,
      charCode: keyCode,
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
      simulateKeyPress("k");
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