// ==UserScript==
// @name         imdb-obsidian-note
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  convert IMDB data to Obsidian note
// @author       Sid
// @match        https://www.imdb.com/title/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.imdb.com/
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const copyContent = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  function copyData() {
    const title = titleHtml?.textContent?.trim() || '';
    const button = document.getElementById('imdb-to-table-copy-btn');
    const basicInfoHTML =
      document
        .querySelector(`[data-testid="hero-title-block__metadata"]`)
        ?.querySelectorAll('li') || [];
    const basicInfo = {};

    if (basicInfoHTML.length) {
      basicInfoHTML.forEach((b) => {
        if (b?.querySelector('a')) {
          const info = b?.querySelector('a')?.textContent?.trim() || '';

          if (b?.querySelector('a')?.getAttribute('href').includes('releaseinfo')) {
            basicInfo.date = info;
          } else if (b?.querySelector('a')?.getAttribute('href').includes('parentalguide')) {
            basicInfo.ageRating = info;
          }
        } else if (b?.textContent?.includes('Video') || b?.textContent?.includes('TV')) {
          basicInfo.type = b?.textContent?.trim();
        } else if (b?.textContent?.includes('h') || b?.textContent?.includes('m')) {
          basicInfo.runTime = b?.textContent?.trim();
        }
      });
    }

    const raing =
      document.querySelector(`[data-testid="hero-rating-bar__aggregate-rating__score"]`)?.firstChild
        ?.textContent || '';

    const genresHTML =
      document
        .querySelector(`[data-testid="genres"]`)
        ?.querySelector('.ipc-chip-list__scroller')
        ?.querySelectorAll('a') || [];

    let genres = [];

    if (genresHTML.length) {
      genresHTML.forEach((b) => {
        if (b?.querySelector('span')) {
          genres.push(b?.querySelector('span')?.textContent?.trim() || '');
        }
      });
    }

    const plot = document.querySelector(`[data-testid="plot-xl"]`)?.textContent?.trim() || '';

    const ogType =
      document.querySelector('meta[property="og:type"]')?.getAttribute('content') || '';

    const imageTag = document.querySelector('.ipc-image')?.getAttribute('src') || '';

    const cellImage = `${imageTag}`;
    const cellName = `${title?.trim()}`;
    const cellYear = `${basicInfo?.date?.trim() || ''}`;
    const cellType = `${ogType?.includes('tv') ? 'TV' : ''}`;
    const cellGenre = `${genres?.join(', ')}`;
    const cellPG = `${basicInfo?.ageRating?.trim() || ''}`;
    const cellRating = raing;
    const cellLink = `https://www.imdb.com${window.location.pathname}`;
    const isTv = cellType === 'TV' ? true : false;
    const contentPlaceholder = isTv ? 'TV Series' : 'Movie';

    const date = new Date();
    const dateTimeFormat = new Intl.DateTimeFormat('en-US');
    const dateParts = dateTimeFormat.formatToParts(date);
    const datePartValues = dateParts.map((p) => p.value).filter((p) => p !== '/');
    let [month, day, year] = datePartValues;

    month = Number(month) < 10 ? `0${month}` : month;
    day = Number(day) < 10 ? `0${day}` : day;

    const dateAdded = `${year}-${month}-${day}`;

    const formattedData = `---
alias: ${cellName}
year: ${cellYear}
genre: ${cellGenre}
tags:
pg: ${cellPG}
rating: ${cellRating}
tv: ${isTv}
url: "${cellLink}"
poster: "${cellImage}"
dateAdded: ${dateAdded}
watched: false
myRating:
dateWatched:
---

# ${cellName} (${cellYear})
#watchList

![poster](${cellImage})
${
  isTv
    ? `
${contentPlaceholder}`
    : ''
}
${plot} [More info](${cellLink})

---

## 🎨 ${contentPlaceholder} in few words

## 🧐 Summary

## 📚 Who should watch this ${contentPlaceholder}?

## ☘ How this ${contentPlaceholder} changed / affected me?

## 🌟Favorite moments
`;

    copyContent(formattedData);

    button.style.color = '#f5c518';

    setTimeout(() => {
      button.style.color = '#fff';
    }, 400);
  }

  const titleHtml = document.querySelector('H1');

  const copyButton = document.createElement('button');

  copyButton.setAttribute('id', 'imdb-to-table-copy-btn');

  copyButton.innerHTML = `
  <svg class="w-6 h-6" fill="none" stroke="currentColor" style="width: 22px; height: 22px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
  `;

  copyButton.style.fontSize = '0.9rem';
  copyButton.style.height = '28px';
  copyButton.style.padding = 0;
  copyButton.style.marginLeft = '10px';
  copyButton.style.display = 'inline-flex';
  copyButton.style.alignItems = 'center';
  copyButton.style.cursor = 'pointer';
  copyButton.style.border = 'none';
  copyButton.style.backgroundColor = 'transparent';
  copyButton.style.color = '#fff';
  copyButton.style.position = 'relative';
  copyButton.style.top = '-7px';

  copyButton.addEventListener('click', copyData);

  titleHtml.append(copyButton);
  // | Name | Year | Type | Genre | Rating | PG  | Link |
})();
