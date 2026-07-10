export default function ContactCard({ contacto, onEliminar }) {
  return (
    <article className="contact-card">
      <div className="contact-card-info">
        <h3>{contacto.nombre} {contacto.apellido}</h3>
        <p><strong>Telefono:</strong> {contacto.telefono}</p>
        <p><strong>Correo:</strong> {contacto.correo}</p>
      </div>
      <div className="contact-card-actions">
        <button
          type="button"
          className="btn btn-danger"
          aria-label={`Eliminar contacto ${contacto.nombre} ${contacto.apellido}`}
          onClick={() => onEliminar(contacto.id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
