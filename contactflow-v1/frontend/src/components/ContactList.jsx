import ContactCard from "./ContactCard.jsx";

export default function ContactList({ contactos, cargando, onEliminar }) {
  if (cargando) {
    return <p className="state-message" role="status">Cargando contactos...</p>;
  }

  if (!contactos || contactos.length === 0) {
    return <p className="state-message">Aun no hay contactos registrados.</p>;
  }

  return (
    <div className="contact-list">
      {contactos.map((contacto) => (
        <ContactCard key={contacto.id} contacto={contacto} onEliminar={onEliminar} />
      ))}
    </div>
  );
}
