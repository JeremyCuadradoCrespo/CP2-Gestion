const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;

/**
 * Valida los datos de un contacto para la version 1 (agenda basica).
 * Devuelve un objeto { valido, errores }.
 */
export function validarContacto(datos) {
  const errores = [];
  const { nombre, apellido, telefono, correo } = datos || {};

  if (!nombre || typeof nombre !== "string" || nombre.trim().length === 0) {
    errores.push("El nombre es obligatorio.");
  } else if (nombre.trim().length > 80) {
    errores.push("El nombre no puede superar los 80 caracteres.");
  }

  if (!apellido || typeof apellido !== "string" || apellido.trim().length === 0) {
    errores.push("El apellido es obligatorio.");
  } else if (apellido.trim().length > 80) {
    errores.push("El apellido no puede superar los 80 caracteres.");
  }

  if (!telefono || typeof telefono !== "string" || telefono.trim().length === 0) {
    errores.push("El telefono es obligatorio.");
  } else if (!PHONE_REGEX.test(telefono.trim())) {
    errores.push("El formato del telefono no es valido.");
  }

  if (!correo || typeof correo !== "string" || correo.trim().length === 0) {
    errores.push("El correo es obligatorio.");
  } else if (!EMAIL_REGEX.test(correo.trim())) {
    errores.push("El formato del correo no es valido.");
  }

  return {
    valido: errores.length === 0,
    errores
  };
}

export function validarId(id) {
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0;
}
