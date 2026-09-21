import StatCard from "./StatCard";
import "./Header.css";

function Header(props) {
  return (
    <header className="header">
      <div className="header-top">
        <h1>🎬 Ações Rápidas</h1>
      </div>

      <div className="quick-actions">
        <StatCard value={props.watchedCount} label="Assistidos" />

        <StatCard value={props.totalMovies} label="Filmes" />

        <StatCard value={props.favoritesCount} label="Favoritos" />

        <button
          type="button"
          className="add-item-card"
          onClick={props.onAddItem}
        >
          Add Novo Item
        </button>
      </div>
    </header>
  );
}

export default Header;
