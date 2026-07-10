export default function ContactList({ contactos, cargando, onEliminar }) {
  if (cargando) {
    return <p className="contact-list-loading">Cargando contactos...</p>;
  }

  if (!contactos.length) {
    return (
      <p className="contact-list-empty">
        Todavía no existen contactos registrados.
      </p>
    );
  }

  return (
    <div className="contact-list">
      {contactos.map((contacto) => (
        <article key={contacto.id} className="contact-card">
          <div className="contact-card-info">
            <h3 className="contact-card-name">
              {contacto.nombre} {contacto.apellido}
            </h3>

            <div className="contact-card-details">
              <span>{contacto.telefono}</span>
              <span>{contacto.correo}</span>
            </div>
          </div>

          <button
            type="button"
            className="contact-delete-button"
            onClick={() => onEliminar(contacto.id)}
          >
            Eliminar
          </button>
        </article>
      ))}
    </div>
  );
}