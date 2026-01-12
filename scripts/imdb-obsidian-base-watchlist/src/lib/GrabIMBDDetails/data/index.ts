import { extractYears } from './extractYears';
import { generateZettelIdFromDate } from './generateZettelIdFromDate';
import { getContentCategory } from './getContentCategory';
import { getCountryOfOrigin } from './getCountryOfOrigin';
import { getImdbSchema } from './getImdbSchema';
import { getLanguages } from './getLanguages';
import type { ImdbDatabase } from './types';
import {
  cleanText,
  convertIsoDurationToReadable,
  decodeHtmlEntities,
  formatLocalDateTime,
} from './utils';

export function getDatabase(): ImdbDatabase {
  const schema = getImdbSchema();

  const name = cleanText(schema.alternateName || schema.name || '');
  const originalName = cleanText(schema.name || '');
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
