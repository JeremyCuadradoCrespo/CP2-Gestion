import { query } from "../config/db.js";
import { CATEGORIAS_VALIDAS } from "../validators/contactValidator.js";

/**
 * Genera un resumen basico de contactos agrupados por categoria.
 */
export async function obtenerResumen() {
  const resultado = await query(
    "SELECT categoria, COUNT(*)::int AS total FROM contacts GROUP BY categoria"
  );

  const conteos = Object.fromEntries(CATEGORIAS_VALIDAS.map((categoria) => [categoria, 0]));

  for (const fila of resultado.rows) {
    conteos[fila.categoria] = fila.total;
  }

  const total = Object.values(conteos).reduce((acumulado, valor) => acumulado + valor, 0);

  return {
    total,
    personal: conteos.Personal,
    trabajo: conteos.Trabajo,
    universidad: conteos.Universidad,
    familia: conteos.Familia,
    otro: conteos.Otro
  };
}
