import { useEffect, useState } from "react";
import { FiHeart, FiMoon, FiSun } from "react-icons/fi";
import { resetFilters as resetFiltersAction, setFilter, setShowingWatchlist, toggleFavorite, toggleWatchlistView } from "./store/watchlistSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";
import Pagination from "./components/Pagination";
import { useTheme } from "./context/ThemeContext";
import FilterBar from "./components/FilterBar";
import Footer from "./components/Footer";
import { getPopularMovies, searchMovies } from "./services/tmdbService";
import type { Movie } from "./types/movie";

import "./App.css";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const { favorites, filters, showingWatchlist } = useAppSelector((state) => state.watchlist);
  const { theme, toggleTheme } = useTheme();

  const resetFilters = () => {
    setCurrentPage(1);
    dispatch(resetFiltersAction());
  };

  const handleHomeClick = () => {
    dispatch(setShowingWatchlist(false));
    setSearchQuery("");
    setSearchTerm("");
    setCurrentPage(1);
    resetFilters();
  };

  useEffect(() => {
    if (showingWatchlist) return;
    const timer = window.setTimeout(() => {
      setSearchTerm(searchQuery.trim());
      setCurrentPage(1);
    }, 500);
    return () => window.clearTimeout(timer);
  }, [searchQuery, showingWatchlist]);

  useEffect(() => {
    if (showingWatchlist) return;

    const loadMovies = async () => {
      try {
        setLoading(true);
        setError("");
        const activeFilters = { year: filters.year, language: filters.language, rating: filters.rating };
        const data = searchTerm
          ? await searchMovies(searchTerm, currentPage, activeFilters)
          : await getPopularMovies(currentPage, activeFilters);
        setMovies(data.results ?? []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (loadError: unknown) {
        console.error(loadError);
        setError("Unable to load movies. Please try again.");
        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    void loadMovies();
  }, [searchTerm, currentPage, showingWatchlist, filters.year, filters.language, filters.rating]);

  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (movie: Movie) => {
    dispatch(toggleFavorite(movie));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWatchlistClick = () => {
    const nextValue = !showingWatchlist;
    dispatch(toggleWatchlistView());
    if (nextValue) {
      setSearchQuery("");
      setSearchTerm("");
    }
    setCurrentPage(1);
  };

  const handleFilterChange = (key: "rating" | "year" | "language" | "sort", value: string) => {
    setCurrentPage(1);
    dispatch(setFilter({ key, value }));
  };

  const displayedMovies = showingWatchlist ? favorites : movies;
  const filteredMovies = displayedMovies.filter((movie) => {
    const movieYear = movie.release_date ? movie.release_date.substring(0, 4) : "";
    return (!filters.rating || movie.vote_average >= Number(filters.rating))
      && (!filters.year || movieYear === filters.year)
      && (!filters.language || movie.original_language === filters.language);
  });

  const sortedMovies = [...filteredMovies].sort((movieA, movieB) => {
    switch (filters.sort) {
      case "rating-desc": return movieB.vote_average - movieA.vote_average;
      case "rating-asc": return movieA.vote_average - movieB.vote_average;
      case "title-asc": return movieA.title.localeCompare(movieB.title);
      case "title-desc": return movieB.title.localeCompare(movieA.title);
      case "date-desc": return new Date(movieB.release_date || "1900-01-01").getTime() - new Date(movieA.release_date || "1900-01-01").getTime();
      case "date-asc": return new Date(movieA.release_date || "1900-01-01").getTime() - new Date(movieB.release_date || "1900-01-01").getTime();
      default: return 0;
    }
  });

  const heroStats = [
    { label: "Trending", value: movies.length ? `${movies.length}+` : "Live" },
    { label: "Watchlist", value: favorites.length },
    { label: "Top rated", value: "8.6+" },
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container navbar-content">
          <button className="brand-button" onClick={handleHomeClick} aria-label="Go to home">
            <span className="brand-icon">🎬</span><span>CineScope</span>
          </button>
          <div className="navbar-actions">
            <button className={`nav-link-button ${!showingWatchlist ? "nav-link-active" : ""}`} onClick={handleHomeClick}>Home</button>
            <button className={`watchlist-button ${showingWatchlist ? "watchlist-active" : ""}`} onClick={handleWatchlistClick}>
              <FiHeart fill={showingWatchlist ? "currentColor" : "none"} /><span>Watchlist</span><strong>{favorites.length}</strong>
            </button>
            <button className="theme-button" onClick={toggleTheme} aria-label="Toggle theme">{theme === "light" ? <FiMoon /> : <FiSun />}</button>
          </div>
        </div>
      </nav>

      <main className="container">
        {!showingWatchlist && <section className="hero-section">
          <div className="hero-content">
            <span className="hero-badge">🎥 Curated cinema discovery</span>
            <h1>Find your next<span className="hero-highlight"> favorite movie</span></h1>
            <p>Explore trending titles, track your watchlist, and uncover standout films with a cleaner, more polished discovery experience.</p>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className="hero-stats">
              {heroStats.map((stat) => <div className="stat-card" key={stat.label}><span className="stat-label">{stat.label}</span><strong>{stat.value}</strong></div>)}
            </div>
            <div className="quick-searches">
              <span>Popular searches:</span>
              {[
                "Avengers", "Interstellar", "Inception", "Batman",
              ].map((query) => <button key={query} onClick={() => setSearchQuery(query)}>{query}</button>)}
            </div>
          </div>
        </section>}

        <section className="movies-section">
          <div className="section-heading"><div>
            <h2>{showingWatchlist ? "My Watchlist" : searchTerm ? `Search Results for "${searchTerm}"` : "Popular Movies"}</h2>
            <p>{showingWatchlist ? "Movies you've saved for later." : searchTerm ? "Explore movies matching your search." : "Explore what's trending and popular right now."}</p>
          </div></div>

          {!showingWatchlist && !loading && !error && movies.length > 0 && <div className="results-info">Showing {sortedMovies.length} movies{searchTerm ? ` for "${searchTerm}"` : " from popular movies"}</div>}
          {!loading && !error && displayedMovies.length > 0 && <FilterBar filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />}
          {!showingWatchlist && loading && <Loader />}
          {!showingWatchlist && error && <div className="error-message">{error}</div>}
          {showingWatchlist && favorites.length === 0 && <div className="no-results watchlist-empty"><div className="empty-icon">❤️</div><h3>Your watchlist is empty</h3><p>Click the heart icon on a movie to save it here.</p></div>}
          {!showingWatchlist && !loading && !error && movies.length === 0 && <div className="no-results">No movies found.</div>}
          {!loading && !error && displayedMovies.length > 0 && sortedMovies.length === 0 && <div className="no-results"><h3>No movies match your filters</h3><p>Try changing your rating, year, or language filters.</p></div>}
          {!loading && !error && displayedMovies.length > 0 && <>
            <MovieGrid movies={sortedMovies} onMovieClick={setSelectedMovieId} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
            {!showingWatchlist && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
          </>}
        </section>
      </main>
      <Footer />
      {selectedMovieId !== null && <MovieDetails movieId={selectedMovieId} onClose={() => setSelectedMovieId(null)} />}
    </div>
  );
};

export default App;