export default function SearchBar({ value, onChange, placeholder }) {
  const hasSearch = value.trim().length > 0;

  return (
    <div className="search-field-wrapper">
      <span className="search-icon" aria-hidden="true">&#128269;</span>
      <label htmlFor="search-contacts" className="sr-only">Buscar contactos</label>
      <input
        id="search-contacts"
        name="search"
        type="search"
        placeholder={placeholder || "Buscar contactos"}
        value={value}
        autoComplete="off"
        aria-label="Buscar contactos por nombre, apellido, telefono o correo"
        onChange={(evento) => onChange(evento.target.value)}
      />
      {hasSearch && (
        <button
          type="button"
          className="search-clear-btn"
          aria-label="Limpiar busqueda"
          title="Limpiar busqueda"
          onClick={() => onChange("")}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
}
