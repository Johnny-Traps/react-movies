import { useState } from "react";
import "./AddItem.css";

function AddItem(props) {
  const [newMovie, setNewMovie] = useState({
    movieTitle: "",
    rating: 0,
    releaseYear: "",
    imageUrl: "",
    categories: [],
    watched: false,
    favorite: false,
  });
  const handleMovieTitleChange = (event) => {
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      movieTitle: event.target.value,
    }));
  };
  const handleRatingChange = (event) => {
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      rating: Number(event.target.value),
    }));
  };
  const handleReleaseYearChange = (event) => {
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      releaseYear: event.target.value,
    }));
  };
  const handleImageUrlChange = (event) => {
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      imageUrl: event.target.value,
    }));
  };
  const handleCategoriesChange = (event) => {
    const categories = event.target.value
      .split(",")
      .map((category) => category.trim());

    setNewMovie((prevMovie) => ({
      ...prevMovie,
      categories,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    props.onAddMovie(newMovie);
  };

  return (
    <section
      className={`add-item${props.isClosing ? " add-item--closing" : ""}`}
      onTransitionEnd={props.onTransitionEnd}
    >
      <h2>Adicionar novo item</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="movie-title">Título</label>
        <input
          id="movie-title"
          type="text"
          value={newMovie.movieTitle}
          onChange={handleMovieTitleChange}
          placeholder="Digite o título do filme"
        />

        <label htmlFor="release-year">Ano de lançamento</label>
        <input
          id="release-year"
          type="number"
          value={newMovie.releaseYear}
          onChange={handleReleaseYearChange}
          placeholder="Ex: 2024"
        />

        <label htmlFor="rating">Nota</label>
        <input
          id="rating"
          type="number"
          min="0"
          max="5"
          value={newMovie.rating}
          onChange={handleRatingChange}
        />

        <label htmlFor="image-url">URL da imagem</label>
        <input
          id="image-url"
          type="text"
          value={newMovie.imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Cole a URL da imagem (A URL deve ser do TheMovieDb)"
        />

        <label htmlFor="categories">Categorias</label>
        <input
          id="categories"
          type="text"
          onChange={handleCategoriesChange}
          placeholder="Ex: Ação, Drama, Ficção Científica"
        />

        <button className="btn-cancel" type="button" onClick={props.onCancel}>
          Cancelar
        </button>
        <button className="btn-submit" type="submit">
          Adicionar Filme
        </button>
      </form>
    </section>
  );
}

export default AddItem;
