import "./MovieCard.css";

function MovieCard(props) {
  const rating = Number.isFinite(props.movie.rating)
    ? Math.min(5, Math.max(0, Math.round(props.movie.rating)))
    : 0;
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <article>
      <div className="movie-card">
        <button
          type="button"
          className="favorite-btn"
          onClick={() => props.onToggleFavorite(props.movie.id)}
          aria-pressed={props.movie.favorite}
          aria-label={`Favorito: ${props.movie.movieTitle}`}
        >
          {props.movie.favorite ? "❤️" : "🤍"}
        </button>

        <img
          src={props.movie.imageUrl}
          alt={`Pôster de ${props.movie.movieTitle}`}
          loading="lazy"
        />

        <h3>{props.movie.movieTitle}</h3>

        <span
          className="stars"
          aria-label={`Avaliação: ${rating} de 5 estrelas`}
        >
          {stars}
        </span>

        <div className="categories">
          {props.movie.categories.map((category) => (
            <span key={category} className="category-tag">
              {category}
            </span>
          ))}
        </div>

        <span className="year">{props.movie.releaseYear}</span>

        <button
          type="button"
          className={
            props.movie.watched ? "watched-btn watched" : "watched-btn"
          }
          onClick={() => props.onToggleWatched(props.movie.id)}
          aria-pressed={props.movie.watched}
        >
          {props.movie.watched ? "Assistido ✅" : "Não Assistido ❌"}
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
