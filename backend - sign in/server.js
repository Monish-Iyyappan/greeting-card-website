import express from "express"; // Import Express to build the backend server.
import cors from "cors"; // Import CORS to allow browser requests.
import path from "path"; // Import path to work with file paths.
import { fileURLToPath } from "url"; // Import fileURLToPath to get file path from module URL.
import authRoutes from "./routes/authRoutes.js"; // Import authentication route definitions.
import config from "./config/config.js"; // Import configuration values from .env.
import { initializeDatabase } from "./database/db.js"; // Import database initialization helper.
import { errorHandler } from "./middleware/errorHandler.js"; // Import error handling middleware.

const app = express(); // Create the Express application instance.
const __filename = fileURLToPath(import.meta.url); // Convert the current module URL to a file path.
const __dirname = path.dirname(__filename); // Get the current directory of this file.

app.use(cors()); // Enable CORS for all incoming requests.
app.use(express.json()); // Enable parsing of JSON request bodies.
app.use(authRoutes); // Register the authentication routes on the app.

if (process.env.NODE_ENV === "production") { // Only serve static files in production.
  app.use(express.static(path.resolve(__dirname, "dist"))); // Serve the built frontend files.
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "dist", "index.html"))); // Return index.html for any route.
}

app.use(errorHandler); // Use the error handler after routes.

initializeDatabase() // Initialize the database and create tables.
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`); // Log the port when the server starts.
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error); // Log the database initialization error.
    process.exit(1); // Stop the process if the database cannot be initialized.
  });
