import { useEffect, useRef, useState } from "react";
import { parsearContactosCSV } from "../utils/csv.js";

export default function ImportModal({ isOpen, onImport, onCancel, isImporting, resultado }) {
  const overlayRef = useRef(null);
  const inputRef = useRef(null);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [contactos, setContactos] = useState([]);
  const [errorArchivo, setErrorArchivo] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setNombreArchivo("");
      setContactos([]);
      setErrorArchivo("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [isOpen]);

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

  function manejarClicOverlay(evento) {
    if (evento.target === overlayRef.current) {
      onCancel();
    }
  }

  function manejarArchivo(evento) {
    const archivo = evento.target.files?.[0];
    setContactos([]);
    setErrorArchivo("");

    if (!archivo) {
      setNombreArchivo("");
      return;
    }

    setNombreArchivo(archivo.name);

    const lector = new FileReader();
    lector.onload = () => {
      const { contactos: contactosParseados, errores } = parsearContactosCSV(String(lector.result));

      if (errores.length > 0) {
        setErrorArchivo(errores.join(" "));
        return;
      }

      setContactos(contactosParseados);
    };
    lector.onerror = () => setErrorArchivo("No se pudo leer el archivo.");
    lector.readAsText(archivo);
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    if (contactos.length === 0) {
      return;
    }

    onImport(contactos);
  }

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={manejarClicOverlay}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-modal-title"
      >
        <div className="modal-header">
          <h2 id="import-modal-title">Importar contactos</h2>
          <button type="button" className="icon-btn" aria-label="Cerrar" onClick={onCancel}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <form className="contact-form" onSubmit={manejarEnvio} noValidate>
          <p className="form-helper">
            Sube un archivo CSV con las columnas <code>nombre, apellido, telefono, correo, categoria, notas</code>{" "}
            (la primera fila debe ser el encabezado).
          </p>

          <div className="form-field form-field-wide">
            <label htmlFor="import-file">Archivo CSV</label>
            <input
              id="import-file"
              ref={inputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={manejarArchivo}
            />
          </div>

          {errorArchivo && <span className="field-error">{errorArchivo}</span>}

          {contactos.length > 0 && !errorArchivo && (
            <p className="form-helper">
              Se encontraron <strong>{contactos.length}</strong> contactos en <strong>{nombreArchivo}</strong>, listos para importar.
            </p>
          )}

          {resultado && (
            <div className="import-summary">
              <p>
                <strong>{resultado.creados.length}</strong> contactos importados correctamente.
              </p>
              {resultado.omitidos.length > 0 && (
                <>
                  <p>{resultado.omitidos.length} filas omitidas:</p>
                  <ul className="import-summary-list">
                    {resultado.omitidos.map((omitido, indice) => (
                      <li key={indice}>
                        {omitido.fila ? `Fila ${omitido.fila}: ` : `${omitido.correo}: `}
                        {omitido.motivo}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isImporting}>
              Cerrar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isImporting || contactos.length === 0}
            >
              {isImporting ? "Importando..." : "Importar contactos"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
