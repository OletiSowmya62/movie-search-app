export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  original_language: string;
  genre_ids?: number[];
  adult?: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetailsResponse extends Movie {
  genres: Genre[];
  runtime: number | null;
  tagline: string;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MovieFilters {
  rating: string;
  year: string;
  language: string;
}

export type SortOption =
  | "default"
  | "rating-desc"
  | "rating-asc"
  | "title-asc"
  | "title-desc"
  | "date-desc"
  | "date-asc";

export interface AppFilters extends MovieFilters {
  sort: SortOption;
}

export type FilterKey = keyof AppFilters;