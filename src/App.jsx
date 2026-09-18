import { useEffect, useState } from "react";
import { FiHeart, FiMoon, FiSun } from "react-icons/fi";

import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";
import Pagination from "./components/Pagination";
import { useTheme } from "./context/ThemeContext";
import FilterBar from "./components/FilterBar";
import Footer from "./components/Footer";

import {
  getPopularMovies,
  searchMovies,
} from "./services/tmdbService";

import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("movieFavorites");

      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Unable to load favorites:", error);
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const [filters, setFilters] = useState({
    rating: "",
    year: "",
    language: "",
    sort: "default",
  });

  const handleHomeClick = () => {
    setShowFavorites(false);
    setSearchQuery("");
    setSearchTerm("");
    setCurrentPage(1);
    resetFilters();
  };

  useEffect(() => {
    if (showFavorites) {
      return;
    }

    const timer = setTimeout(() => {
      const trimmedQuery = searchQuery.trim();
      setSearchTerm(trimmedQuery);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, showFavorites]);

  useEffect(() => {
    if (showFavorites) {
      return;
    }

    const loadMovies = async () => {
      try {
        setLoading(true);
        setError("");

        let data;
        const activeFilters = {
          year: filters.year,
          language: filters.language,
          rating: filters.rating,
        };

        if (searchTerm) {
          data = await searchMovies(searchTerm, currentPage, activeFilters);
        } else {
          data = await getPopularMovies(currentPage, activeFilters);
        }

        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (error) {
        console.error(error);
        setError("Unable to load movies. Please try again.");
        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [searchTerm, currentPage, showFavorites]);

  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (movie) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (favorite) => favorite.id === movie.id
      );

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (favorite) => favorite.id !== movie.id
        );
      }

      return [...currentFavorites, movie];
    });
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseDetails = () => {
    setSelectedMovieId(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWatchlistClick = () => {
    const nextValue = !showFavorites;
    setShowFavorites(nextValue);

    if (nextValue) {
      setSearchQuery("");
      setSearchTerm("");
      setCurrentPage(1);
    } else {
      setCurrentPage(1);
    }
  };

  const displayedMovies = showFavorites ? favorites : movies;
  const { theme, toggleTheme } = useTheme();

  const handleFilterChange = (key, value) => {
    setCurrentPage(1);
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setCurrentPage(1);
    setFilters({
      rating: "",
      year: "",
      language: "",
      sort: "default",
    });
  };

  const filteredMovies = displayedMovies.filter((movie) => {
    const movieYear = movie.release_date
      ? movie.release_date.substring(0, 4)
      : "";

    const matchesRating =
      !filters.rating ||
      movie.vote_average >= Number(filters.rating);

    const matchesYear = !filters.year || movieYear === filters.year;

    const matchesLanguage =
      !filters.language ||
      movie.original_language === filters.language;

    return matchesRating && matchesYear && matchesLanguage;
  });

  const sortedMovies = [...filteredMovies].sort((movieA, movieB) => {
    switch (filters.sort) {
      case "rating-desc":
        return (movieB.vote_average || 0) - (movieA.vote_average || 0);

      case "rating-asc":
        return (movieA.vote_average || 0) - (movieB.vote_average || 0);

      case "title-asc":
        return movieA.title.localeCompare(movieB.title);

      case "title-desc":
        return movieB.title.localeCompare(movieA.title);

      case "date-desc":
        return (
          new Date(movieB.release_date || "1900-01-01") -
          new Date(movieA.release_date || "1900-01-01")
        );

      case "date-asc":
        return (
          new Date(movieA.release_date || "1900-01-01") -
          new Date(movieB.release_date || "1900-01-01")
        );

      default:
        return 0;
    }
  });

  const heroStats = [
    {
      label: "Trending",
      value: movies.length ? `${movies.length}+` : "Live",
    },
    {
      label: "Watchlist",
      value: favorites.length,
    },
    {
      label: "Top rated",
      value: "8.6+",
    },
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container navbar-content">
          <button
            className="brand-button"
            onClick={handleHomeClick}
            aria-label="Go to home"
          >
            <span className="brand-icon">🎬</span>
            <span>CineScope</span>
          </button>

          <div className="navbar-actions">
            <button
              className={`nav-link-button ${
                !showFavorites ? "nav-link-active" : ""
              }`}
              onClick={handleHomeClick}
            >
              Home
            </button>

            <button
              className={`watchlist-button ${
                showFavorites ? "watchlist-active" : ""
              }`}
              onClick={handleWatchlistClick}
            >
              <FiHeart
                fill={showFavorites ? "currentColor" : "none"}
              />
              <span>Watchlist</span>
              <strong>{favorites.length}</strong>
            </button>

            <button
              className="theme-button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <FiMoon /> : <FiSun />}
            </button>
          </div>
        </div>
      </nav>

      <main className="container">
        {!showFavorites && (
          <section className="hero-section">
            <div className="hero-content">
              <span className="hero-badge">🎥 Curated cinema discovery</span>

              <h1>
                Find your next
                <span className="hero-highlight"> favorite movie</span>
              </h1>

              <p>
                Explore trending titles, track your watchlist, and uncover
                standout films with a cleaner, more polished discovery
                experience.
              </p>

              <SearchBar value={searchQuery} onChange={setSearchQuery} />

              <div className="hero-stats">
                {heroStats.map((stat) => (
                  <div className="stat-card" key={stat.label}>
                    <span className="stat-label">{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </div>
                ))}
              </div>

              <div className="quick-searches">
                <span>Popular searches:</span>

                <button onClick={() => setSearchQuery("Avengers")}>Avengers</button>
                <button onClick={() => setSearchQuery("Interstellar")}>
                  Interstellar
                </button>
                <button onClick={() => setSearchQuery("Inception")}>
                  Inception
                </button>
                <button onClick={() => setSearchQuery("Batman")}>Batman</button>
              </div>
            </div>
          </section>
        )}

        <section className="movies-section">
          <div className="section-heading">
            <div>
              <h2>
                {showFavorites
                  ? "My Watchlist"
                  : searchTerm
                    ? `Search Results for "${searchTerm}"`
                    : "Popular Movies"}
              </h2>

              <p>
                {showFavorites
                  ? "Movies you've saved for later."
                  : searchTerm
                    ? "Explore movies matching your search."
                    : "Explore what's trending and popular right now."}
              </p>
            </div>
          </div>

          {!showFavorites && !loading && !error && movies.length > 0 && (
            <div className="results-info">
              Showing {sortedMovies.length} movies
              {searchTerm ? ` for "${searchTerm}"` : " from popular movies"}
            </div>
          )}

          {!loading && !error && displayedMovies.length > 0 && (
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={resetFilters}
            />
          )}

          {!showFavorites && loading && <Loader />}

          {!showFavorites && error && (
            <div className="error-message">{error}</div>
          )}

          {showFavorites && favorites.length === 0 && (
            <div className="no-results watchlist-empty">
              <div className="empty-icon">❤️</div>
              <h3>Your watchlist is empty</h3>
              <p>Click the heart icon on a movie to save it here.</p>
            </div>
          )}

          {!showFavorites && !loading && !error && movies.length === 0 && (
            <div className="no-results">No movies found.</div>
          )}

          {!loading && !error && displayedMovies.length > 0 && sortedMovies.length === 0 && (
            <div className="no-results">
              <h3>No movies match your filters</h3>
              <p>Try changing your rating, year, or language filters.</p>
            </div>
          )}

          {!loading && !error && displayedMovies.length > 0 && (
            <>
              <MovieGrid
                movies={sortedMovies}
                onMovieClick={handleMovieClick}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />

              {!showFavorites && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </section>
      </main>

      <Footer />

      {selectedMovieId && (
        <MovieDetails
          movieId={selectedMovieId}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default App;