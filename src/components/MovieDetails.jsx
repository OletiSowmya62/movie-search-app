import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

import { getMovieDetails } from "../services/tmdbService";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieDetails = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  const formatRuntime = (minutes) => {
    if (!minutes) {
      return "N/A";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  };

  if (loading) {
    return (
      <div className="details-overlay">
        <div className="details-modal loading-details">
          <button className="close-button" onClick={onClose}>
            <FiX />
          </button>

          <div className="loader-container">
            <div className="loader"></div>
            <p>Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-overlay">
        <div className="details-modal">
          <button className="close-button" onClick={onClose}>
            <FiX />
          </button>

          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const backdrop = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : "";

  const year = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  return (
    <div
      className="details-overlay"
      onClick={onClose}
    >
      <div
        className="details-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close movie details"
        >
          <FiX />
        </button>

        {backdrop && (
          <div className="movie-backdrop">
            <img
              src={backdrop}
              alt=""
            />
          </div>
        )}

        <div className="details-content">
          <div className="details-poster-wrapper">
            <img
              src={poster}
              alt={movie.title}
              className="details-poster"
            />
          </div>

          <div className="details-info">
            <h2>{movie.title}</h2>

            {movie.tagline && (
              <p className="movie-tagline">
                {movie.tagline}
              </p>
            )}

            <div className="details-meta">
              <span>{year}</span>
              <span>⭐ {movie.vote_average?.toFixed(1)}</span>
              <span>{formatRuntime(movie.runtime)}</span>
            </div>

            {movie.genres?.length > 0 && (
              <div className="genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre-badge">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <h3>Overview</h3>

            <p className="movie-overview">
              {movie.overview || "No overview available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;