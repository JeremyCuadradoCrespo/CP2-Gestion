import SearchBar from "./SearchBar.jsx";

export default function AppHeader({ searchTerm, onSearchChange, onToggleSidebar }) {
  return (
    <header className="app-header">
      <button
        type="button"
        className="icon-btn hamburger-btn"
        aria-label="Abrir u ocultar el menu lateral"
        onClick={onToggleSidebar}
      >
        <span aria-hidden="true">&#9776;</span>
      </button>

      <a className="app-brand" href="/" aria-label="ContactFlow - inicio">
        <span className="app-brand-mark" aria-hidden="true">CF</span>
        <span className="app-brand-name">ContactFlow</span>
      </a>

      <div className="app-header-search">
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Buscar por nombre, apellido, telefono o correo"
        />
      </div>

      <div className="app-header-actions">
        <button type="button" className="icon-btn" aria-label="Ayuda">
          <span aria-hidden="true">?</span>
        </button>
        <button type="button" className="icon-btn" aria-label="Configuracion">
          <span aria-hidden="true">&#9881;</span>
        </button>
        <button type="button" className="user-avatar" aria-label="Cuenta del usuario">
          J
        </button>
      </div>
    </header>
  );
}
