import { CATEGORIAS } from "../../data/categories.js";

const ICONS = {
  plus: "M12 5v14m-7-7h14",
  contacts: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87m-2-11.26a4 4 0 0 1 0 7.75",
  star: "m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2Z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87m-2-11.26a4 4 0 0 1 0 7.75",
  import: "M12 3v12m0 0 4-4m-4 4-4-4M4 21h16",
  trash: "M3 6h18m-2 0-.87 12.14A2 2 0 0 1 16.14 20H7.86a2 2 0 0 1-1.99-1.86L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 5v5m4-5v5",
  tag: "M20.59 13.41 13.41 20.59a2 2 0 0 1-2.82 0L3 13V3h10l7.59 7.59a2 2 0 0 1 0 2.82ZM7.5 7.5h.01"
};

function NavIcon({ name }) {
  return (
    <svg
      className="nav-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

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
          <NavIcon name="plus" />
          Crear contacto
        </button>

        <nav className="sidebar-nav" aria-label="Vistas de contactos">
          <button
            type="button"
            className={`sidebar-nav-item${!selectedCategory ? " is-active" : ""}`}
            onClick={() => onCategoryChange("")}
          >
            <span>
              <NavIcon name="contacts" />
              Contactos
            </span>
            <span className="nav-count">{totalContacts}</span>
          </button>

          <button type="button" className="sidebar-nav-item sidebar-static">
            <span>
              <NavIcon name="star" />
              Frecuentes
            </span>
          </button>

          <button type="button" className="sidebar-nav-item sidebar-static">
            <span>
              <NavIcon name="users" />
              Otros contactos
            </span>
          </button>
        </nav>

        <div>
          <p className="sidebar-section-title">Administrar</p>
          <nav className="sidebar-nav" aria-label="Administracion">
            <button type="button" className="sidebar-nav-item sidebar-static">
              <span>
                <NavIcon name="import" />
                Importar
              </span>
            </button>
            <button type="button" className="sidebar-nav-item sidebar-static">
              <span>
                <NavIcon name="trash" />
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
                  <NavIcon name="tag" />
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
