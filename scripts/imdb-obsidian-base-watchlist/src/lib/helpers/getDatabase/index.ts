import { extractYears } from './extractYears/extractYears';
import { generateZettelIdFromDate } from './generateZettelIdFromDate/generateZettelIdFromDate';
import { getContentCategory } from './getContentCategory/getContentCategory';
import { getCountryOfOrigin } from './getCountryOfOrigin/getCountryOfOrigin';
import { getImdbSchema } from './getImdbSchema/getImdbSchema';
import { getLanguages } from './getLanguages/getLanguages';
import type { ImdbDatabase } from '../../types';
import { decodeHtmlEntities } from '../decodeHtmlEntities/decodeHtmlEntities';
import { formatLocalDateTime } from '../formatLocalDateTime/formatLocalDateTime';
import { cleanText } from '../cleanText/cleanText';
import { convertIsoDurationToReadable } from '../convertIsoDurationToReadable/convertIsoDurationToReadable';

export function getDatabase(): ImdbDatabase {
  const schema = getImdbSchema();

  const name = decodeHtmlEntities(cleanText(schema.alternateName || schema.name || ''));
  const originalName = decodeHtmlEntities(cleanText(schema.name || ''));
  const category = getContentCategory(schema['@type'] || '', schema.genre || []);
  const rating = schema.aggregateRating?.ratingValue?.toString();
  const certification = schema.contentRating;
  const imdbLink = schema.url || '';
  const description = decodeHtmlEntities(schema.description);

  const posters = {
    normal: schema.image || '',
    small: schema.image ? schema.image.replace('.jpg', '_UX200_.jpg') : '',
  };

  const runtime = convertIsoDurationToReadable(schema.duration);
  const countries = getCountryOfOrigin();
  const languages = getLanguages();
  const years = extractYears(document.title || '');
  const createdAt = formatLocalDateTime(new Date());
  const zettelId = generateZettelIdFromDate(new Date());

  return {
    name,
    originalName,
    category,
    rating,
    certification,
    genre: schema.genre || [],
    years,
    runtime,
    imdbLink,
    countries,
    languages,
    description,
    posters,
    createdAt,
    zettelId,
  };
}
