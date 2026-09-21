import MovieCard from "./MovieCard";
import "./MovieList.css";

function MovieList(props) {
  return (
    <section className="movie-list">
      <h2>Todos os Filmes</h2>

      {props.movies.length === 0 ? (
        <p>Nenhum filme encontrado.</p>
      ) : (
        <div className="movie-grid">
          {props.movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleWatched={props.onToggleWatched}
              onToggleFavorite={props.onToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MovieList;
