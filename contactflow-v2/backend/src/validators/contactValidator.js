const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;

export const CATEGORIAS_VALIDAS = ["Personal", "Trabajo", "Universidad", "Familia", "Otro"];

/**
 * Valida los datos de un contacto para la version 2 (agenda avanzada).
 * El parametro esParcial permite reutilizar la funcion en creacion (false)
 * y en edicion (true, donde los campos ausentes no se reportan como error
 * si no fueron enviados).
 */
export function validarContacto(datos, { esParcial = false } = {}) {
  const errores = [];
  const { nombre, apellido, telefono, correo, categoria, notas } = datos || {};

  if (!esParcial || nombre !== undefined) {
    if (!nombre || typeof nombre !== "string" || nombre.trim().length === 0) {
      errores.push("El nombre es obligatorio.");
    } else if (nombre.trim().length > 80) {
      errores.push("El nombre no puede superar los 80 caracteres.");
    }
  }

  if (!esParcial || apellido !== undefined) {
    if (!apellido || typeof apellido !== "string" || apellido.trim().length === 0) {
      errores.push("El apellido es obligatorio.");
    } else if (apellido.trim().length > 80) {
      errores.push("El apellido no puede superar los 80 caracteres.");
    }
  }

  if (!esParcial || telefono !== undefined) {
    if (!telefono || typeof telefono !== "string" || telefono.trim().length === 0) {
      errores.push("El telefono es obligatorio.");
    } else if (!PHONE_REGEX.test(telefono.trim())) {
      errores.push("El formato del telefono no es valido.");
    }
  }

  if (!esParcial || correo !== undefined) {
    if (!correo || typeof correo !== "string" || correo.trim().length === 0) {
      errores.push("El correo es obligatorio.");
    } else if (!EMAIL_REGEX.test(correo.trim())) {
      errores.push("El formato del correo no es valido.");
    }
  }

  if (!esParcial || categoria !== undefined) {
    if (!categoria || typeof categoria !== "string" || categoria.trim().length === 0) {
      errores.push("La categoria es obligatoria.");
    } else if (!CATEGORIAS_VALIDAS.includes(categoria.trim())) {
      errores.push(`La categoria debe ser una de: ${CATEGORIAS_VALIDAS.join(", ")}.`);
    }
  }

  if (notas !== undefined && notas !== null && typeof notas !== "string") {
    errores.push("Las notas deben ser texto.");
  }

  if (typeof notas === "string" && notas.length > 500) {
    errores.push("Las notas no pueden superar los 500 caracteres.");
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
