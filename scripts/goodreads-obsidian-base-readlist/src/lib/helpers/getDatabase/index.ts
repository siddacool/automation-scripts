import { generateZettelIdFromDate } from './generateZettelIdFromDate/generateZettelIdFromDate';
import { decodeHtmlEntities } from '../decodeHtmlEntities/decodeHtmlEntities';
import { formatLocalDateTime } from '../formatLocalDateTime/formatLocalDateTime';
import { cleanText } from '../cleanText/cleanText';
import { getGenres } from './getGenres';
import type { BookDatabase } from 'src/lib/types';
import { getPageNumber } from './getPageNo';

export function getDatabase(): BookDatabase {
  const title = decodeHtmlEntities(
    cleanText(document?.querySelector('[data-testid="bookTitle"]')?.textContent || ''),
  );
  const publicationInfo = document.querySelector('[data-testid="publicationInfo"]')?.textContent;
  const year = Number(publicationInfo?.split(',')[1] || '');
  const author = document?.querySelector('.ContributorLink__name')?.textContent || '';
  const genre = getGenres();
  const description = decodeHtmlEntities(
    document?.querySelector('[data-testid="description"]')?.textContent,
  );

  const poster =
    document
      .querySelector('.BookCover__image')
      ?.querySelector('.ResponsiveImage')
      ?.getAttribute('src') || '';

  const createdAt = formatLocalDateTime(new Date());
  const zettelId = generateZettelIdFromDate(new Date());
  const rating = document.querySelector('.RatingStatistics__rating')?.textContent || '';
  const pageNo = getPageNumber();
  const pageUrl = window.location.href;

  return {
    title,
    year,
    author,
    genre,
    poster,
    description,
    createdAt,
    zettelId,
    rating,
    pageNo,
    pageUrl,
  };
}
