import { useEffect, useRef } from "react";
import ContactForm from "./ContactForm.jsx";

export default function ContactModal({ isOpen, mode, initialData, onSubmit, onCancel, isSaving }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    function manejarTecla(evento) {
      if (evento.key === "Escape") {
        onCancel();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", manejarTecla);
    }

    return () => document.removeEventListener("keydown", manejarTecla);
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  const titulo = mode === "edit" ? "Editar contacto" : "Crear contacto";

  function manejarClicOverlay(evento) {
    if (evento.target === overlayRef.current) {
      onCancel();
    }
  }

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={manejarClicOverlay}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div className="modal-header">
          <h2 id="contact-modal-title">{titulo}</h2>
          <button type="button" className="icon-btn" aria-label="Cerrar" onClick={onCancel}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <ContactForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onCancel}
          mode={mode}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}
