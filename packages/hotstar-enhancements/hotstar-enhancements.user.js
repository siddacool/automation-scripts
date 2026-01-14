// ==UserScript==
// @name         Disney+ Hotstar Enhancements
// @namespace    https://github.com/siddacool/automation-scripts/tree/main/scripts/hotstar-enhancements
// @version      2.0.6
// @author       siddacool
// @description  a Tampermonkey script to enhance your Disney+ Hotstar viewing experience with features like better subtitles, Enter as play/pause button and more.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=https://www.hotstar.com/in/
// @source       https://github.com/siddacool/automation-scripts/tree/main/scripts/hotstar-enhancements
// @downloadURL  https://raw.githubusercontent.com/siddacool/automation-scripts/gh-pages/packages/hotstar-enhancements/hotstar-enhancements.user.js
// @updateURL    https://raw.githubusercontent.com/siddacool/automation-scripts/gh-pages/packages/hotstar-enhancements/hotstar-enhancements.meta.js
// @match        https://www.hotstar.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function keyboardShortcutHandler(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const player = document.querySelector('button[aria-label="Play"]') || document.querySelector('button[aria-label="Pause"]') || document.querySelector(".skin-container");
      console.log("handleKeyboardShortcut", player);
      player?.click();
    }
  }
  const FONT_SIZE = "3.3rem";
  function injectStyles(css) {
    const styleElm = document.createElement("style");
    styleElm.innerText = css;
    document.head.appendChild(styleElm);
  }
  function enhanceSubtitles() {
    const css = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

    .shaka-text-container span {
      font-family: 'Roboto', sans-serif !important;
      font-size: ${FONT_SIZE} !important;
      background-color: transparent !important;
      font-weight: 400 !important;
      text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
    }
  `;
    injectStyles(css);
  }
  function hideLogo() {
    const css = `.watermark-content { display: none !important; }`;
    injectStyles(css);
  }
  const setupGlobalKeyboardEvents = () => {
    window.addEventListener("keypress", keyboardShortcutHandler);
    window.addEventListener("beforeunload", () => {
      window.removeEventListener("keypress", keyboardShortcutHandler);
    });
  };
  const main = async () => {
    setupGlobalKeyboardEvents();
    await delay(5e3);
    enhanceSubtitles();
    hideLogo();
  };
  main();

})();