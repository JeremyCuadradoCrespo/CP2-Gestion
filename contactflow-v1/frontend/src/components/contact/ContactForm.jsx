import { useState } from "react";
import { validarFormularioContacto } from "../../utils/formValidator.js";

const ESTADO_INICIAL = {
  nombre: "",
  apellido: "",
  telefono: "",
  correo: ""
};

export default function ContactForm({ onCrear, cargando }) {
  const [valores, setValores] = useState(ESTADO_INICIAL);
  const [errores, setErrores] = useState({});

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setValores((previo) => ({ ...previo, [name]: value }));
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();

    const { valido, errores: erroresValidacion } = validarFormularioContacto(valores);
    setErrores(erroresValidacion);

    if (!valido) {
      return;
    }

    const exito = await onCrear(valores);

    if (exito) {
      setValores(ESTADO_INICIAL);
      setErrores({});
    }
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
          />
          {errores.nombre && <span className="field-error">{errores.nombre}</span>}
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
          />
          {errores.apellido && <span className="field-error">{errores.apellido}</span>}
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
          />
          {errores.telefono && <span className="field-error">{errores.telefono}</span>}
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
          />
          {errores.correo && <span className="field-error">{errores.correo}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={cargando}>
          {cargando ? "Guardando..." : "Registrar contacto"}
        </button>
      </div>
    </form>
  );
}
