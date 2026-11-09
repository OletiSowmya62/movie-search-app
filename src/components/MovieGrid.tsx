import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  favorites: Movie[];
  onMovieClick: (movieId: number) => void;
  onToggleFavorite: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onMovieClick, favorites, onToggleFavorite }: MovieGridProps) => (
  <div className="movie-grid">
    {movies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        onClick={onMovieClick}
        isFavorite={favorites.some((favorite) => favorite.id === movie.id)}
        onToggleFavorite={onToggleFavorite}
      />
    ))}
  </div>
);

export default MovieGrid;