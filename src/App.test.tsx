import { configureStore } from "@reduxjs/toolkit";
import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { getPopularMovies, searchMovies } from "./services/tmdbService";
import watchlistReducer from "./store/watchlistSlice";
import type { Movie, PaginatedResponse } from "./types/movie";

jest.mock("./services/tmdbService", () => ({
  getPopularMovies: jest.fn(),
  searchMovies: jest.fn(),
  getMovieDetails: jest.fn(),
}));

const movieFixtures: Movie[] = [
  {
    id: 101,
    title: "Arrival",
    overview: "A linguist meets an alien species.",
    poster_path: null,
    backdrop_path: null,
    release_date: "2024-11-11",
    vote_average: 8.2,
    original_language: "en",
  },
  {
    id: 202,
    title: "The Room",
    overview: "A drama with a lower audience score.",
    poster_path: null,
    backdrop_path: null,
    release_date: "2003-06-27",
    vote_average: 4.0,
    original_language: "en",
  },
];

const response = (results: Movie[]): PaginatedResponse<Movie> => ({
  page: 1,
  results,
  total_pages: 1,
  total_results: results.length,
});

const renderApp = () => {
  const store = configureStore({ reducer: { watchlist: watchlistReducer } });
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>,
  );
};

const mockPopularMovies = jest.mocked(getPopularMovies);
const mockSearchMovies = jest.mocked(searchMovies);

beforeEach(() => {
  localStorage.clear();
  mockPopularMovies.mockResolvedValue(response(movieFixtures));
  mockSearchMovies.mockResolvedValue(response([movieFixtures[0]]));
});

afterEach(() => {
  cleanup();
});

describe("movie discovery", () => {
  it("debounces search input and displays the returned search result", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(await screen.findByRole("heading", { name: "Arrival" })).toBeTruthy();
    await user.type(screen.getByRole("textbox", { name: "Search movies" }), "arrival");

    expect(await screen.findByRole("heading", { name: "Search Results for \"arrival\"" })).toBeTruthy();
    await waitFor(() => expect(mockSearchMovies).toHaveBeenLastCalledWith("arrival", 1, {
      year: "",
      language: "",
      rating: "",
    }));
  });

  it("filters displayed movies by rating", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(await screen.findByRole("heading", { name: "The Room" })).toBeTruthy();
    await user.selectOptions(screen.getByRole("combobox", { name: "Filter by rating" }), "8");

    expect(screen.getByRole("heading", { name: "Arrival" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "The Room" })).toBeNull();
    await waitFor(() => expect(mockPopularMovies).toHaveBeenLastCalledWith(1, {
      year: "",
      language: "",
      rating: "8",
    }));

    await user.selectOptions(screen.getByRole("combobox", { name: "Filter by year" }), "2024");
    expect(screen.getByRole("heading", { name: "Arrival" })).toBeTruthy();
    await waitFor(() => expect(mockPopularMovies).toHaveBeenLastCalledWith(1, {
      year: "2024",
      language: "",
      rating: "8",
    }));

    await user.selectOptions(screen.getByRole("combobox", { name: "Filter by language" }), "hi");
    expect(screen.getByRole("heading", { name: "No movies match your filters" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Reset" }));
    await user.selectOptions(screen.getByRole("combobox", { name: "Sort movies" }), "title-desc");
    const movieTitles = screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent);
    expect(movieTitles).toEqual(["The Room", "Arrival"]);
  });

  it("adds a movie to the persisted watchlist and displays it", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(await screen.findByRole("heading", { name: "Arrival" })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Add Arrival to favorites" }));
    await user.click(screen.getByRole("button", { name: /Watchlist/ }));

    expect(screen.getByRole("heading", { name: "My Watchlist" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Arrival" })).toBeTruthy();
    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem("movieFavorites") ?? "[]")).toEqual([movieFixtures[0]]);
    });
  });
});