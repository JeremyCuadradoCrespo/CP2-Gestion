import { CATEGORIAS } from "../data/categories.js";

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="category-filter">
      <label htmlFor="category-filter">Categoria</label>
      <select
        id="category-filter"
        name="category-filter"
        value={value}
        onChange={(evento) => onChange(evento.target.value)}
      >
        <option value="">Todas las categorias</option>
        {CATEGORIAS.map((categoria) => (
          <option key={categoria} value={categoria}>{categoria}</option>
        ))}
      </select>
    </div>
  );
}
