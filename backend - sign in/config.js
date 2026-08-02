import dotenv from "dotenv"; // Import dotenv to load environment variables from .env.

dotenv.config(); // Load environment variables into process.env.

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  PORT,
} = process.env; // Read the required environment variables.

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) { // Check that required database values exist.
  throw new Error(
    "Missing required database environment variables. Please add DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME to your .env file."
  );
}

export default {
  db: {
    host: DB_HOST, // Set the database host.
    user: DB_USER, // Set the database user.
    password: DB_PASSWORD, // Set the database password.
    database: DB_NAME, // Set the database name.
    port: DB_PORT ? Number(DB_PORT) : 3306, // Use DB_PORT or default to 3306.
    waitForConnections: true, // Allow the pool to wait for a connection if none are available.
    connectionLimit: 10, // Set the maximum number of database connections.
    queueLimit: 0, // Allow unlimited queued connection requests.
  },
  port: PORT ? Number(PORT) : 4000, // Use the PORT variable or default to 4000.
};
