import { CATEGORIAS } from "../data/categories.js";

export default function Sidebar({
  isOpen,
  totalContacts,
  selectedCategory,
  onCategoryChange,
  onCreateContact,
  onCloseSidebar
}) {
  return (
    <>
      {isOpen && (
        <div className="sidebar-backdrop" onClick={onCloseSidebar} aria-hidden="true" />
      )}

      <aside className={`sidebar${isOpen ? " is-open" : ""}`} aria-label="Menu de navegacion">
        <button type="button" className="btn-create-contact" onClick={onCreateContact}>
          <span className="plus-icon" aria-hidden="true">+</span>
          Crear contacto
        </button>

        <nav className="sidebar-nav" aria-label="Vistas de contactos">
          <button
            type="button"
            className={`sidebar-nav-item${!selectedCategory ? " is-active" : ""}`}
            onClick={() => onCategoryChange("")}
          >
            <span>
              <span className="nav-icon" aria-hidden="true">&#9776;</span>
              Contactos
            </span>
            <span className="nav-count">{totalContacts}</span>
          </button>

          <button type="button" className="sidebar-nav-item sidebar-static">
            <span>
              <span className="nav-icon" aria-hidden="true">&#9733;</span>
              Frecuentes
            </span>
          </button>

          <button type="button" className="sidebar-nav-item sidebar-static">
            <span>
              <span className="nav-icon" aria-hidden="true">&#128101;</span>
              Otros contactos
            </span>
          </button>
        </nav>

        <div>
          <p className="sidebar-section-title">Administrar</p>
          <nav className="sidebar-nav" aria-label="Administracion">
            <button type="button" className="sidebar-nav-item sidebar-static">
              <span>
                <span className="nav-icon" aria-hidden="true">&#8595;</span>
                Importar
              </span>
            </button>
            <button type="button" className="sidebar-nav-item sidebar-static">
              <span>
                <span className="nav-icon" aria-hidden="true">&#128465;</span>
                Papelera
              </span>
            </button>
          </nav>
        </div>

        <div>
          <p className="sidebar-section-title">Etiquetas</p>
          <nav className="sidebar-nav" aria-label="Filtrar por categoria">
            {CATEGORIAS.map((categoria) => (
              <button
                key={categoria}
                type="button"
                className={`sidebar-nav-item${selectedCategory === categoria ? " is-active" : ""}`}
                onClick={() => onCategoryChange(categoria)}
                aria-pressed={selectedCategory === categoria}
              >
                <span>
                  <span className="nav-icon" aria-hidden="true">#</span>
                  {categoria}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
