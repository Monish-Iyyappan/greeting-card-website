import { getPool } from "../database/db.js";

export async function findUserByUsername(username) {
  const pool = getPool();
  const [rows] = await pool.execute("SELECT id, username, password FROM users WHERE username = ?", [username]);
  return rows[0];
}

export async function createUser(username, hashedPassword) {
  const pool = getPool();
  const [result] = await pool.execute(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword]
  );
  return result.insertId;
}
