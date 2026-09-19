import axios from "axios";

const tmdbApi = axios.create({
  baseURL: "/api",
  headers: {
    accept: "application/json",
  },
});

export const searchMovies = async (
  query,
  page = 1,
  filterOptions = {}
) => {
  const response = await tmdbApi.get("/tmdb", {
    params: {
      endpoint: "/search/movie",
      query,
      page,
      include_adult: false,
      language: "en-US",
      ...(filterOptions.year
        ? { primary_release_year: Number(filterOptions.year) }
        : {}),
      ...(filterOptions.language
        ? { with_original_language: filterOptions.language }
        : {}),
      ...(filterOptions.rating
        ? { "vote_average.gte": Number(filterOptions.rating) }
        : {}),
    },
  });

  return response.data;
};

export const getPopularMovies = async (
  page = 1,
  filterOptions = {}
) => {
  const response = await tmdbApi.get("/tmdb", {
    params: {
      endpoint: "/discover/movie",
      page,
      language: "en-US",
      region: "IN",
      sort_by: "popularity.desc",
      ...(filterOptions.year
        ? { primary_release_year: Number(filterOptions.year) }
        : {}),
      ...(filterOptions.language
        ? { with_original_language: filterOptions.language }
        : {}),
      ...(filterOptions.rating
        ? { "vote_average.gte": Number(filterOptions.rating) }
        : {}),
    },
  });

  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await tmdbApi.get("/tmdb", {
    params: {
      endpoint: `/movie/${movieId}`,
      language: "en-US",
    },
  });

  return response.data;
};