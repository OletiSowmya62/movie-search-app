import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    accept: "application/json",
  },
});

export const searchMovies = async (query, page = 1, filterOptions = {}) => {
  const response = await tmdbApi.get("/search/movie", {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
      ...(filterOptions.year ? { primary_release_year: Number(filterOptions.year) } : {}),
      ...(filterOptions.language ? { with_original_language: filterOptions.language } : {}),
      ...(filterOptions.rating ? { "vote_average.gte": Number(filterOptions.rating) } : {}),
    },
  });

  return response.data;
};

export const getPopularMovies = async (page = 1, filterOptions = {}) => {
  const response = await tmdbApi.get("/discover/movie", {
    params: {
      page,
      language: "en-US",
      region: "IN",
      sort_by: "popularity.desc",
      ...(filterOptions.year ? { primary_release_year: Number(filterOptions.year) } : {}),
      ...(filterOptions.language ? { with_original_language: filterOptions.language } : {}),
      ...(filterOptions.rating ? { "vote_average.gte": Number(filterOptions.rating) } : {}),
    },
  });

  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`, {
    params: {
      language: "en-US",
    },
  });

  return response.data;
};