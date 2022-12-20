// ==UserScript==
// @name         youtube-enter-play-fullscreen
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Assign Enter as play button on full screen
// @author       Sid
// @match        https://www.youtube.com/watch?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.youtube.com/
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const triggerSpace = () => {
    const e = new Event('keydown');
    e.which = e.keyCode = 32; // 32 is the keycode for the space bar
    document.dispatchEvent(e);
  };

  const buttoonAssigner = (event) => {
    if (event.key === 'Enter' && document.fullscreenElement !== null) {
      event.preventDefault();
      console.log('Enter');

      triggerSpace();
    }
  };

  window.addEventListener('keypress', buttoonAssigner);
})();
