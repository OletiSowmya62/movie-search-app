import MovieCard from "./MovieCard";

const MovieGrid = ({
  movies,
  onMovieClick,
  favorites,
  onToggleFavorite,
}) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onMovieClick}
          isFavorite={favorites.some(
            (favorite) => favorite.id === movie.id
          )}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default MovieGrid;