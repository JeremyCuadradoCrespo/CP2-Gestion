const PALETA_COLORES = [
  "#1a73e8",
  "#188038",
  "#e37400",
  "#d93025",
  "#9334e6",
  "#12805c",
  "#c2185b",
  "#0b8043",
  "#8e24aa",
  "#f9ab00"
];

/**
 * Obtiene las iniciales (nombre + apellido) de un contacto.
 */
export function obtenerIniciales(nombre = "", apellido = "") {
  const inicialNombre = nombre.trim().charAt(0).toUpperCase();
  const inicialApellido = apellido.trim().charAt(0).toUpperCase();
  return `${inicialNombre}${inicialApellido}` || "?";
}

/**
 * Genera un color determinista para el avatar de un contacto,
 * basado en su ID (o en su nombre si no hay ID disponible).
 */
export function obtenerColorAvatar(semilla) {
  const texto = String(semilla ?? "0");
  let acumulado = 0;

  for (let i = 0; i < texto.length; i += 1) {
    acumulado += texto.charCodeAt(i);
  }

  const indice = acumulado % PALETA_COLORES.length;
  return PALETA_COLORES[indice];
}
