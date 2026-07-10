import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === "production";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? {
        rejectUnauthorized: false
      }
    : false
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
