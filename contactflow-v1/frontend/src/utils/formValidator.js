const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;

/**
 * Validacion manual del formulario de contacto (version 1).
 * Devuelve un objeto { valido, errores } con mensajes claros.
 */
export function validarFormularioContacto({ nombre, apellido, telefono, correo }) {
  const errores = {};

  if (!nombre || nombre.trim().length === 0) {
    errores.nombre = "El nombre es obligatorio.";
  }

  if (!apellido || apellido.trim().length === 0) {
    errores.apellido = "El apellido es obligatorio.";
  }

  if (!telefono || telefono.trim().length === 0) {
    errores.telefono = "El telefono es obligatorio.";
  } else if (!PHONE_REGEX.test(telefono.trim())) {
    errores.telefono = "El formato del telefono no es valido.";
  }

  if (!correo || correo.trim().length === 0) {
    errores.correo = "El correo es obligatorio.";
  } else if (!EMAIL_REGEX.test(correo.trim())) {
    errores.correo = "El formato del correo no es valido.";
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores
  };
}
