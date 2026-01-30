import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function getAllUsers() {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
}

export async function getOneUser(id_user) {
  const result = await pool.query('SELECT * FROM users WHERE id_user = $1 LIMIT 1', [id_user]);
  return result.rows[0];
}
