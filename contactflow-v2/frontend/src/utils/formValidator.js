import { CATEGORIAS } from "../data/categories.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;

/**
 * Validacion manual del formulario de contacto (version 2).
 * Devuelve un objeto { valido, errores } con mensajes claros.
 */
export function validarFormularioContacto({ nombre, apellido, telefono, correo, categoria, notas }) {
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

  if (!categoria || categoria.trim().length === 0) {
    errores.categoria = "La categoria es obligatoria.";
  } else if (!CATEGORIAS.includes(categoria.trim())) {
    errores.categoria = "La categoria seleccionada no es valida.";
  }

  if (notas && notas.length > 500) {
    errores.notas = "Las notas no pueden superar los 500 caracteres.";
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores
  };
}
