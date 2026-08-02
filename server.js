import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./backend - sign in/authRoutes.js";
import config from "./backend - sign in/config.js";
import { initializeDatabase } from "./backend - sign in/db.js";
import { errorHandler } from "./backend - sign in/errorHandler.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "dist")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "dist", "index.html")));
}

app.use(errorHandler);

initializeDatabase()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });
