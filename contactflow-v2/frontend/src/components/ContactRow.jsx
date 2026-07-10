import { obtenerIniciales, obtenerColorAvatar } from "../utils/initials.js";

export default function ContactRow({
  contacto,
  isSelected,
  view = "todos",
  onEdit,
  onDelete,
  onSelect,
  onToggleFavorite,
  onRestore,
  onPermanentDelete,
  rowRef
}) {
  const iniciales = obtenerIniciales(contacto.nombre, contacto.apellido);
  const color = obtenerColorAvatar(contacto.id);
  const enPapelera = view === "papelera";

  return (
    <tr
      ref={rowRef}
      className={`contact-row${isSelected ? " is-selected" : ""}`}
      onClick={() => onSelect(contacto)}
      data-nombre-inicial={contacto.nombre?.charAt(0).toUpperCase()}
    >
      <td data-label="Nombre">
        <div className="contact-primary-cell">
          {!enPapelera && (
            <button
              type="button"
              className={`icon-btn favorite-btn${contacto.favorito ? " is-favorite" : ""}`}
              aria-pressed={contacto.favorito}
              aria-label={
                contacto.favorito
                  ? `Quitar ${contacto.nombre} ${contacto.apellido} de frecuentes`
                  : `Marcar ${contacto.nombre} ${contacto.apellido} como frecuente`
              }
              onClick={(evento) => {
                evento.stopPropagation();
                onToggleFavorite(contacto);
              }}
            >
              <span aria-hidden="true">{contacto.favorito ? "★" : "☆"}</span>
            </button>
          )}
          <span className="contact-avatar" style={{ backgroundColor: color }} aria-hidden="true">
            {iniciales}
          </span>
          <span className="contact-name">{contacto.nombre} {contacto.apellido}</span>
        </div>
      </td>
      <td data-label="Correo">{contacto.correo}</td>
      <td data-label="Telefono" className="col-phone">{contacto.telefono}</td>
      <td data-label="Categoria" className="col-category">
        <span className="category-badge">{contacto.categoria}</span>
      </td>
      <td data-label="Acciones" className="actions-cell">
        <div className="contact-actions">
          {enPapelera ? (
            <>
              <button
                type="button"
                className="icon-btn"
                aria-label={`Restaurar contacto ${contacto.nombre} ${contacto.apellido}`}
                onClick={(evento) => {
                  evento.stopPropagation();
                  onRestore(contacto.id);
                }}
              >
                <span aria-hidden="true">&#8635;</span>
              </button>
              <button
                type="button"
                className="icon-btn"
                aria-label={`Eliminar definitivamente el contacto ${contacto.nombre} ${contacto.apellido}`}
                onClick={(evento) => {
                  evento.stopPropagation();
                  onPermanentDelete(contacto.id);
                }}
              >
                <span aria-hidden="true">&#128465;</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="icon-btn"
                aria-label={`Ver detalle de ${contacto.nombre} ${contacto.apellido}`}
                onClick={(evento) => {
                  evento.stopPropagation();
                  onSelect(contacto);
                }}
              >
                <span aria-hidden="true">&#9432;</span>
              </button>
              <button
                type="button"
                className="icon-btn"
                aria-label={`Editar contacto ${contacto.nombre} ${contacto.apellido}`}
                onClick={(evento) => {
                  evento.stopPropagation();
                  onEdit(contacto);
                }}
              >
                <span aria-hidden="true">&#9998;</span>
              </button>
              <button
                type="button"
                className="icon-btn"
                aria-label={`Eliminar contacto ${contacto.nombre} ${contacto.apellido}`}
                onClick={(evento) => {
                  evento.stopPropagation();
                  onDelete(contacto.id);
                }}
              >
                <span aria-hidden="true">&#128465;</span>
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
