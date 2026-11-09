import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AppFilters, FilterKey, Movie, SortOption } from "../types/movie";

interface WatchlistState {
  favorites: Movie[];
  filters: AppFilters;
  showingWatchlist: boolean;
}

const initialFilters: AppFilters = {
  rating: "",
  year: "",
  language: "",
  sort: "default",
};

const loadFavorites = (): Movie[] => {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem("movieFavorites") ?? "[]");
    return Array.isArray(saved) ? saved as Movie[] : [];
  } catch (error: unknown) {
    console.error("Unable to load favorites:", error);
    return [];
  }
};

const initialState: WatchlistState = {
  favorites: loadFavorites(),
  filters: initialFilters,
  showingWatchlist: false,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Movie>) {
      const movieId = action.payload.id;
      const existingIndex = state.favorites.findIndex((movie) => movie.id === movieId);
      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
    setFilter(state, action: PayloadAction<{ key: FilterKey; value: string }>) {
      const { key, value } = action.payload;
      if (key === "sort") {
        state.filters.sort = value as SortOption;
      } else {
        state.filters[key] = value;
      }
    },
    resetFilters(state) {
      state.filters = initialFilters;
    },
    setShowingWatchlist(state, action: PayloadAction<boolean>) {
      state.showingWatchlist = action.payload;
    },
    toggleWatchlistView(state) {
      state.showingWatchlist = !state.showingWatchlist;
    },
  },
});

export const {
  resetFilters,
  setFilter,
  setShowingWatchlist,
  toggleFavorite,
  toggleWatchlistView,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;