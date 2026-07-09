import { query } from "../config/db.js";

/**
 * Capa de servicios: contiene la logica de acceso a datos
 * relacionada con los contactos de ContactFlow V2.
 */

const COLUMNAS = "id, nombre, apellido, telefono, correo, categoria, notas, fecha_creacion, fecha_actualizacion";

export async function listarContactos({ search, category } = {}) {
  const condiciones = [];
  const valores = [];

  if (search) {
    valores.push(`%${search.toLowerCase()}%`);
    const indice = valores.length;
    condiciones.push(
      `(LOWER(nombre) LIKE $${indice} OR LOWER(apellido) LIKE $${indice} OR LOWER(telefono) LIKE $${indice} OR LOWER(correo) LIKE $${indice})`
    );
  }

  if (category) {
    valores.push(category);
    condiciones.push(`categoria = $${valores.length}`);
  }

  const where = condiciones.length > 0 ? `WHERE ${condiciones.join(" AND ")}` : "";

  const resultado = await query(
    `SELECT ${COLUMNAS} FROM contacts ${where} ORDER BY fecha_creacion DESC`,
    valores
  );

  return resultado.rows;
}

export async function obtenerContactoPorId(id) {
  const resultado = await query(`SELECT ${COLUMNAS} FROM contacts WHERE id = $1`, [id]);
  return resultado.rows[0] || null;
}

export async function obtenerContactoPorCorreo(correo) {
  const resultado = await query("SELECT id FROM contacts WHERE correo = $1", [correo]);
  return resultado.rows[0] || null;
}

export async function crearContacto({ nombre, apellido, telefono, correo, categoria, notas }) {
  const resultado = await query(
    `INSERT INTO contacts (nombre, apellido, telefono, correo, categoria, notas)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING ${COLUMNAS}`,
    [
      nombre.trim(),
      apellido.trim(),
      telefono.trim(),
      correo.trim().toLowerCase(),
      categoria.trim(),
      notas ? notas.trim() : null
    ]
  );
  return resultado.rows[0];
}

export async function actualizarContacto(id, datos) {
  const campos = [];
  const valores = [];
  let indice = 1;

  const mapaCampos = {
    nombre: (v) => v.trim(),
    apellido: (v) => v.trim(),
    telefono: (v) => v.trim(),
    correo: (v) => v.trim().toLowerCase(),
    categoria: (v) => v.trim(),
    notas: (v) => (v ? v.trim() : null)
  };

  for (const [campo, transformar] of Object.entries(mapaCampos)) {
    if (datos[campo] !== undefined) {
      campos.push(`${campo} = $${indice}`);
      valores.push(transformar(datos[campo]));
      indice += 1;
    }
  }

  campos.push(`fecha_actualizacion = CURRENT_TIMESTAMP`);
  valores.push(id);

  const resultado = await query(
    `UPDATE contacts SET ${campos.join(", ")} WHERE id = $${indice} RETURNING ${COLUMNAS}`,
    valores
  );

  return resultado.rows[0] || null;
}

export async function eliminarContacto(id) {
  const resultado = await query("DELETE FROM contacts WHERE id = $1 RETURNING id", [id]);
  return resultado.rowCount > 0;
}
