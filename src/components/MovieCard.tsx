import type { KeyboardEvent, MouseEvent } from "react";
import { FiHeart } from "react-icons/fi";

import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick: (movieId: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, onClick, isFavorite, onToggleFavorite }: MovieCardProps) => {
  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";
  const year = movie.release_date ? movie.release_date.substring(0, 4) : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggleFavorite(movie);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(movie.id);
    }
  };

  return (
    <article className="movie-card" onClick={() => onClick(movie.id)} role="button" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="poster-wrapper">
        <img src={poster} alt={`${movie.title} poster`} className="movie-poster" loading="lazy" />
        <div className="rating-badge">⭐ {rating}</div>
        <button className={`favorite-button ${isFavorite ? "favorite-active" : ""}`} onClick={handleFavoriteClick} aria-label={isFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}>
          <FiHeart fill={isFavorite ? "currentColor" : "none"} />
        </button>
        <div className="poster-overlay"><span>View Details</span></div>
      </div>
      <div className="movie-info">
        <h3 title={movie.title}>{movie.title}</h3>
        <div className="movie-meta">
          <span>{year}</span>
          <span>{movie.original_language?.toUpperCase()}</span>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;