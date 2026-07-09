import { query } from "../config/db.js";

/**
 * Capa de servicios: contiene la logica de acceso a datos
 * relacionada con los contactos de ContactFlow V1.
 */

export async function listarContactos() {
  const resultado = await query(
    "SELECT id, nombre, apellido, telefono, correo, fecha_creacion FROM contacts ORDER BY fecha_creacion DESC"
  );
  return resultado.rows;
}

export async function obtenerContactoPorId(id) {
  const resultado = await query(
    "SELECT id, nombre, apellido, telefono, correo, fecha_creacion FROM contacts WHERE id = $1",
    [id]
  );
  return resultado.rows[0] || null;
}

export async function obtenerContactoPorCorreo(correo) {
  const resultado = await query("SELECT id FROM contacts WHERE correo = $1", [correo]);
  return resultado.rows[0] || null;
}

export async function crearContacto({ nombre, apellido, telefono, correo }) {
  const resultado = await query(
    `INSERT INTO contacts (nombre, apellido, telefono, correo)
     VALUES ($1, $2, $3, $4)
     RETURNING id, nombre, apellido, telefono, correo, fecha_creacion`,
    [nombre.trim(), apellido.trim(), telefono.trim(), correo.trim().toLowerCase()]
  );
  return resultado.rows[0];
}

export async function eliminarContacto(id) {
  const resultado = await query("DELETE FROM contacts WHERE id = $1 RETURNING id", [id]);
  return resultado.rowCount > 0;
}
