import mysql from "mysql2/promise"; // Import the promise-based MySQL client.
import config from "../config/config.js"; // Import the database configuration.

let pool; // Create a variable to store the connection pool.

export async function initializeDatabase() { // Initialize the database and create the users table.
  const connection = await mysql.createConnection({ // Create a temporary connection without selecting a database.
    host: config.db.host, // Use the configured database host.
    user: config.db.user, // Use the configured database user.
    password: config.db.password, // Use the configured database password.
    port: config.db.port, // Use the configured database port.
  });

  await connection.query(
    "CREATE DATABASE IF NOT EXISTS ?? CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;",
    [config.db.database]
  ); // Create the database if it does not already exist.
  await connection.end(); // Close the temporary connection.

  pool = mysql.createPool(config.db); // Create a pool for the configured database.

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `; // Define the users table structure.

  await pool.query(createTableQuery); // Create the users table if needed.
}

export function getPool() { // Return the initialized pool.
  if (!pool) { // If the pool is not ready yet,
    throw new Error("Database not initialized. Call initializeDatabase() first."); // throw an error.
  }
  return pool; // Return the database pool.
}
