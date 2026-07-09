import { useEffect, useState } from "react";
import { validarFormularioContacto } from "../utils/formValidator.js";
import { CATEGORIAS } from "../data/categories.js";

const ESTADO_INICIAL = {
  nombre: "",
  apellido: "",
  telefono: "",
  correo: "",
  categoria: "",
  notas: ""
};

export default function ContactForm({ initialData, onSubmit, onCancel, mode, isSaving }) {
  const [valores, setValores] = useState(ESTADO_INICIAL);
  const [errores, setErrores] = useState({});

  const esEdicion = mode === "edit";

  useEffect(() => {
    if (initialData) {
      setValores({
        nombre: initialData.nombre || "",
        apellido: initialData.apellido || "",
        telefono: initialData.telefono || "",
        correo: initialData.correo || "",
        categoria: initialData.categoria || "",
        notas: initialData.notas || ""
      });
    } else {
      setValores(ESTADO_INICIAL);
    }
    setErrores({});
  }, [initialData]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setValores((previo) => ({ ...previo, [name]: value }));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    const { valido, errores: erroresValidacion } = validarFormularioContacto(valores);
    setErrores(erroresValidacion);

    if (!valido) {
      return;
    }

    onSubmit(valores);
  }

  return (
    <form className="contact-form" onSubmit={manejarEnvio} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={valores.nombre}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? "error-nombre" : undefined}
          />
          {errores.nombre && <span className="field-error" id="error-nombre">{errores.nombre}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="apellido">Apellido</label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            value={valores.apellido}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.apellido)}
            aria-describedby={errores.apellido ? "error-apellido" : undefined}
          />
          {errores.apellido && <span className="field-error" id="error-apellido">{errores.apellido}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="telefono">Telefono</label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            value={valores.telefono}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.telefono)}
            aria-describedby={errores.telefono ? "error-telefono" : undefined}
          />
          {errores.telefono && <span className="field-error" id="error-telefono">{errores.telefono}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="correo">Correo</label>
          <input
            id="correo"
            name="correo"
            type="email"
            value={valores.correo}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.correo)}
            aria-describedby={errores.correo ? "error-correo" : undefined}
          />
          {errores.correo && <span className="field-error" id="error-correo">{errores.correo}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            name="categoria"
            value={valores.categoria}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.categoria)}
            aria-describedby={errores.categoria ? "error-categoria" : undefined}
          >
            <option value="">Selecciona una categoria</option>
            {CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>{categoria}</option>
            ))}
          </select>
          {errores.categoria && <span className="field-error" id="error-categoria">{errores.categoria}</span>}
        </div>

        <div className="form-field form-field-wide">
          <label htmlFor="notas">Notas</label>
          <textarea
            id="notas"
            name="notas"
            rows="3"
            value={valores.notas}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.notas)}
            aria-describedby={errores.notas ? "error-notas" : undefined}
          />
          {errores.notas && <span className="field-error" id="error-notas">{errores.notas}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? "Guardando..." : esEdicion ? "Guardar cambios" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
