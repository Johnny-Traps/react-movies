import { useEffect, useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import AddItem from "./components/AddItem";
import { moviesData } from "./services/data";
import "./App.css";

const STORAGE_KEY = "react-movies";

function App() {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem(STORAGE_KEY);

    return savedMovies ? JSON.parse(savedMovies) : moviesData;
  });
  const [showAddItem, setShowAddItem] = useState(false);
  const [isAddItemClosing, setIsAddItemClosing] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  }, [movies]);

  const updateMovie = (id, updater) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => (movie.id === id ? updater(movie) : movie)),
    );
  };

  const toggleWatched = (id) => {
    updateMovie(id, (movie) => ({
      ...movie,
      watched: !movie.watched,
    }));
  };

  const toggleFavorite = (id) => {
    updateMovie(id, (movie) => ({
      ...movie,
      favorite: !movie.favorite,
    }));
  };

  const closeAddItem = () => {
    if (!showAddItem || isAddItemClosing) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowAddItem(false);
      setIsAddItemClosing(false);
      return;
    }

    setIsAddItemClosing(true);
  };

  const finishCloseAddItem = (event) => {
    if (event.target !== event.currentTarget) return;
    if (!isAddItemClosing || event.propertyName !== "margin-bottom") return;

    setShowAddItem(false);
    setIsAddItemClosing(false);
  };

  const toggleAddItem = () => {
    if (showAddItem) {
      closeAddItem();
      return;
    }

    setShowAddItem(true);
  };

  const addMovie = (newMovie) => {
    setMovies((prevMovies) => {
      const newId =
        prevMovies.length > 0
          ? Math.max(...prevMovies.map((movie) => movie.id)) + 1
          : 1;

      return [
        ...prevMovies,
        {
          ...newMovie,
          id: newId,
        },
      ];
    });

    closeAddItem();
  };

  const totalMovies = movies.length;
  const watchedCount = movies.filter((movie) => movie.watched).length;
  const favoritesCount = movies.filter((movie) => movie.favorite).length;

  return (
    <div className="app">
      <Header
        watchedCount={watchedCount}
        totalMovies={totalMovies}
        favoritesCount={favoritesCount}
        onAddItem={toggleAddItem}
      />

      {showAddItem && (
        <AddItem
          isClosing={isAddItemClosing}
          onAddMovie={addMovie}
          onCancel={closeAddItem}
          onTransitionEnd={finishCloseAddItem}
        />
      )}

      <MovieList
        movies={movies}
        onToggleWatched={toggleWatched}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;
