import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error("[db] Falta la variable de entorno DATABASE_URL. Revisa tu archivo .env");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on("error", (err) => {
  console.error("[db] Error inesperado en el cliente de PostgreSQL:", err.message);
});

export async function query(text, params) {
  try {
    return await pool.query(text, params);
  } catch (error) {
    console.error("[db] Error al ejecutar la consulta:", error.message);
    throw error;
  }
}

export default pool;
