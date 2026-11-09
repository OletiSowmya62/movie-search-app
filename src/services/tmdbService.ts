import axios from "axios";

import type {
  MovieDetailsResponse,
  MovieFilters,
  Movie,
  PaginatedResponse,
} from "../types/movie";

const tmdbApi = axios.create({
  baseURL: "/api",
  headers: {
    accept: "application/json",
  },
});

type TmdbQueryParams = Record<string, string | number | boolean>;

const buildFilterParams = (filterOptions: Partial<MovieFilters>): TmdbQueryParams => ({
  ...(filterOptions.year
    ? { primary_release_year: Number(filterOptions.year) }
    : {}),
  ...(filterOptions.language
    ? { with_original_language: filterOptions.language }
    : {}),
  ...(filterOptions.rating
    ? { "vote_average.gte": Number(filterOptions.rating) }
    : {}),
});

export const searchMovies = async (
  query: string,
  page = 1,
  filterOptions: Partial<MovieFilters> = {},
): Promise<PaginatedResponse<Movie>> => {
  const response = await tmdbApi.get<PaginatedResponse<Movie>>("/tmdb", {
    params: {
      endpoint: "/search/movie",
      query,
      page,
      include_adult: false,
      language: "en-US",
      ...buildFilterParams(filterOptions),
    },
  });

  return response.data;
};

export const getPopularMovies = async (
  page = 1,
  filterOptions: Partial<MovieFilters> = {},
): Promise<PaginatedResponse<Movie>> => {
  const response = await tmdbApi.get<PaginatedResponse<Movie>>("/tmdb", {
    params: {
      endpoint: "/discover/movie",
      page,
      language: "en-US",
      region: "IN",
      sort_by: "popularity.desc",
      ...buildFilterParams(filterOptions),
    },
  });

  return response.data;
};

export const getMovieDetails = async (
  movieId: number,
): Promise<MovieDetailsResponse> => {
  const response = await tmdbApi.get<MovieDetailsResponse>("/tmdb", {
    params: {
      endpoint: `/movie/${movieId}`,
      language: "en-US",
    },
  });

  return response.data;
};