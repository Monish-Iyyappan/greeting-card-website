import { getPool } from "../database/db.js"; // Import the function that returns the database pool.

export async function findUserByUsername(username) { // Find a user by username.
  const pool = getPool(); // Get the database connection pool.
  const [rows] = await pool.execute("SELECT id, username, password FROM users WHERE username = ?", [username]); // Query the user by username.
  return rows[0]; // Return the first matching user.
}

export async function createUser(username, hashedPassword) { // Create a new user record.
  const pool = getPool(); // Get the database connection pool.
  const [result] = await pool.execute(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword]
  ); // Insert a new user with username and hashed password.
  return result.insertId; // Return the id of the inserted row.
}
