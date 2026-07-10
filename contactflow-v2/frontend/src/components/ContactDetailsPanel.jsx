import { obtenerIniciales, obtenerColorAvatar } from "../utils/initials.js";

function formatearFecha(fecha) {
  if (!fecha) {
    return "-";
  }

  return new Date(fecha).toLocaleString("es-EC", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export default function ContactDetailsPanel({
  contact,
  view = "todos",
  onEdit,
  onDelete,
  onRestore,
  onPermanentDelete,
  onClose
}) {
  const estaAbierto = Boolean(contact);
  const enPapelera = view === "papelera";

  return (
    <aside
      className={`contact-details-panel${estaAbierto ? " is-open" : ""}`}
      aria-label="Detalle del contacto"
      aria-hidden={!estaAbierto}
    >
      {contact && (
        <>
          <div className="details-panel-header">
            <button type="button" className="icon-btn" aria-label="Cerrar detalle" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="details-identity">
            <span
              className="contact-avatar contact-avatar-lg"
              style={{ backgroundColor: obtenerColorAvatar(contact.id) }}
              aria-hidden="true"
            >
              {obtenerIniciales(contact.nombre, contact.apellido)}
            </span>
            <h2>{contact.nombre} {contact.apellido}</h2>
            <span className="category-badge">{contact.categoria}</span>
          </div>

          <dl className="details-info-list">
            <div className="details-info-item">
              <dt className="details-info-label">Correo</dt>
              <dd className="details-info-value">{contact.correo}</dd>
            </div>
            <div className="details-info-item">
              <dt className="details-info-label">Telefono</dt>
              <dd className="details-info-value">{contact.telefono}</dd>
            </div>
            <div className="details-info-item">
              <dt className="details-info-label">Notas</dt>
              <dd className="details-info-value">{contact.notas || "Sin notas registradas."}</dd>
            </div>
            <div className="details-info-item">
              <dt className="details-info-label">Fecha de creacion</dt>
              <dd className="details-info-value">{formatearFecha(contact.fecha_creacion)}</dd>
            </div>
            <div className="details-info-item">
              <dt className="details-info-label">Ultima actualizacion</dt>
              <dd className="details-info-value">{formatearFecha(contact.fecha_actualizacion)}</dd>
            </div>
          </dl>

          <div className="details-panel-actions">
            {enPapelera ? (
              <>
                <button type="button" className="btn btn-primary" onClick={() => onRestore(contact.id)}>
                  Restaurar
                </button>
                <button type="button" className="btn btn-danger" onClick={() => onPermanentDelete(contact.id)}>
                  Eliminar definitivamente
                </button>
              </>
            ) : (
              <>
                <button type="button" className="btn btn-primary" onClick={() => onEdit(contact)}>
                  Editar
                </button>
                <button type="button" className="btn btn-danger" onClick={() => onDelete(contact.id)}>
                  Eliminar
                </button>
              </>
            )}
            <button type="button" className="btn btn-text" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
