// ==UserScript==
// @name         hotstar-subtitle-customizer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Change subtitles properties on hotstar
// @author       Sid
// @match        https://www.hotstar.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=https://www.hotstar.com/in/
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // font size
  // Default 5em. Hotstar default 28px
  const FONT_SIZE = '5.2rem';

  // Black backdrop
  // Default false.
  const IS_BACKDROP = false;

  const timeoutPromise = (timeInMs) => new Promise((resolve) => setTimeout(resolve, timeInMs));

  const start = async () => {
    await timeoutPromise(5000);

    const styleElm = document.createElement('style');

    const backdrop = IS_BACKDROP ? 'rgba(0, 0, 0, 0.8)' : 'transparent';

    let style = `.subtitle-container .shaka-text-container > span { font-size: ${FONT_SIZE}; background-color: ${backdrop} !important; font-weight: 600 !important; -webkit-text-stroke: 2px black; } .watermark-content { display: none !important }`;

    styleElm.innerText = style;

    document.getElementsByTagName('head')[0].appendChild(styleElm);
  };

  start();
})();
