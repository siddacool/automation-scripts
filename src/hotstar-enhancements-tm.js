// ==UserScript==
// @name         hotstar-enhancements
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  better subtitles for Disney+ Hotstar. Plus Assign Enter as play button on full screen and more
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

  // Remove channel logo
  const HIDE_CHANNEL_LOGO = true;

  const timeoutPromise = (timeInMs) => new Promise((resolve) => setTimeout(resolve, timeInMs));

  const setSubtitlesOptions = async () => {
    await timeoutPromise(5000);

    const styleElm = document.createElement('style');

    let style = `.subtitle-container .shaka-text-container > span { font-size: ${FONT_SIZE}; background-color: transparent !important; font-weight: 600 !important; -webkit-text-stroke: 2px black; }`;

    if (HIDE_CHANNEL_LOGO) {
      style += `.watermark-content { display: none !important; }`;
    }

    styleElm.innerText = style;

    document.getElementsByTagName('head')[0].appendChild(styleElm);
  };

  setSubtitlesOptions();

  window.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && document.fullscreenElement !== null) {
      const player = document.querySelector('.skin-container');
      event.preventDefault();

      if (player) {
        player.click();
      }
    } else if (event.key === 's' && document.fullscreenElement !== null) {
      const skipVideo = document.querySelector('.skip-video');

      if (skipVideo) {
        const bingeButton = skipVideo.querySelector('.binge-btn');

        if (bingeButton) {
          const parent = bingeButton.parentElement;

          if (parent && parent.classList.contains('show-btn')) {
            bingeButton.click();
          }
        }
      }
    }
  });
})();
