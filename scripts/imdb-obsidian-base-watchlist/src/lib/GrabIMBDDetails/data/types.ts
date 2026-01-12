export interface ImdbDatabaseYears {
  yearStart?: number;
  yearEnd?: number;
}

export interface ImdbDatabasePosters {
  normal: string;
  small: string;
}

export interface ImdbDatabase {
  name: string;
  originalName: string;
  category: string;
  rating?: string;
  certification?: string;
  genre: string[];
  years: ImdbDatabaseYears;
  runtime?: string;
  imdbLink: string;
  countries: string[];
  languages: string[];
  description: string;
  posters: ImdbDatabasePosters;
  createdAt: string;
  zettelId: string;
}

export interface ImdbSchema {
  '@context'?: string;
  '@type'?: string;
  url?: string;
  name?: string;
  alternateName?: string;
  image?: string;
  description?: string;
  genre?: string[];
  contentRating?: string;
  duration?: string;
  aggregateRating?: {
    ratingValue?: number;
  };
}
