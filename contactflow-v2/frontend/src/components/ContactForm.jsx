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

const LIMITE_NOTAS = 500;

export default function ContactForm({ initialData, onSubmit, onCancel, mode, isSaving }) {
  const [valores, setValores] = useState(ESTADO_INICIAL);
  const [errores, setErrores] = useState({});

  const esEdicion = mode === "edit";
  const caracteresNotas = valores.notas.length;

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

    if (errores[name]) {
      setErrores((previo) => {
        const siguientesErrores = { ...previo };
        delete siguientesErrores[name];
        return siguientesErrores;
      });
    }
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    const datosLimpios = {
      nombre: valores.nombre.trim(),
      apellido: valores.apellido.trim(),
      telefono: valores.telefono.trim(),
      correo: valores.correo.trim(),
      categoria: valores.categoria.trim(),
      notas: valores.notas.trim()
    };

    const { valido, errores: erroresValidacion } = validarFormularioContacto(datosLimpios);
    setErrores(erroresValidacion);

    if (!valido) {
      return;
    }

    onSubmit(datosLimpios);
  }

  return (
    <form className="contact-form" onSubmit={manejarEnvio} noValidate>
      <p className="form-helper">Completa los datos principales para agregarlo a tu agenda.</p>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="nombre">Nombre <span aria-hidden="true">*</span></label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ej. Ana"
            autoComplete="given-name"
            autoFocus={!esEdicion}
            required
            value={valores.nombre}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? "error-nombre" : undefined}
          />
          {errores.nombre && <span className="field-error" id="error-nombre">{errores.nombre}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="apellido">Apellido <span aria-hidden="true">*</span></label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            placeholder="Ej. Perez"
            autoComplete="family-name"
            required
            value={valores.apellido}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.apellido)}
            aria-describedby={errores.apellido ? "error-apellido" : undefined}
          />
          {errores.apellido && <span className="field-error" id="error-apellido">{errores.apellido}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="telefono">Telefono <span aria-hidden="true">*</span></label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            placeholder="+593 99 123 4567"
            autoComplete="tel"
            inputMode="tel"
            required
            value={valores.telefono}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.telefono)}
            aria-describedby={errores.telefono ? "error-telefono" : undefined}
          />
          {errores.telefono && <span className="field-error" id="error-telefono">{errores.telefono}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="correo">Correo <span aria-hidden="true">*</span></label>
          <input
            id="correo"
            name="correo"
            type="email"
            placeholder="ana.perez@ejemplo.com"
            autoComplete="email"
            inputMode="email"
            required
            value={valores.correo}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.correo)}
            aria-describedby={errores.correo ? "error-correo" : undefined}
          />
          {errores.correo && <span className="field-error" id="error-correo">{errores.correo}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="categoria">Categoria <span aria-hidden="true">*</span></label>
          <select
            id="categoria"
            name="categoria"
            required
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
          <div className="form-label-row">
            <label htmlFor="notas">Notas</label>
            <span className="field-counter">{caracteresNotas}/{LIMITE_NOTAS}</span>
          </div>
          <textarea
            id="notas"
            name="notas"
            rows="4"
            maxLength={LIMITE_NOTAS}
            placeholder="Detalles importantes del contacto"
            value={valores.notas}
            onChange={manejarCambio}
            aria-invalid={Boolean(errores.notas)}
            aria-describedby={errores.notas ? "error-notas" : undefined}
          />
          {errores.notas && <span className="field-error" id="error-notas">{errores.notas}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isSaving}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSaving}>
          {isSaving ? "Guardando..." : esEdicion ? "Guardar cambios" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
