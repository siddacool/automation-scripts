// ==UserScript==
// @name         Facebook blocker
// @namespace    https://github.com/siddacool/automation-scripts/tree/main/src/facebook-blocker-tm
// @version      1.0.0
// @description  Block Facebook
// @author       Sid
// @match        https://www.facebook.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=https://www.facebook.com/
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/siddacool/automation-scripts/main/src/facebook-blocker-tm/facebook-blocker-tm.js
// @updateURL    https://raw.githubusercontent.com/siddacool/automation-scripts/main/src/facebook-blocker-tm/facebook-blocker-tm.js
// ==/UserScript==

// @ts-check
(function () {
  'use strict';

  /**
   * main function that runs everything.
   *
   * @returns {void}
   */
  function main() {
    if (confirm('Do you want to enter this cesspool?') == true) {
      return;
    } else {
      window.location.replace('http://www.w3schools.com');
      return;
    }
  }

  // Run main
  main();
})();
