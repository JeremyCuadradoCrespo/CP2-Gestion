export default function SearchBar({ value, onChange, placeholder }) {
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
        onChange={(evento) => onChange(evento.target.value)}
      />
    </div>
  );
}
