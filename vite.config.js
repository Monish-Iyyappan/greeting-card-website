import { defineConfig } from "vite"; // Import the Vite config helper.
import react from "@vitejs/plugin-react"; // Load the React plugin for Vite.
export default defineConfig({ // Export the config object for Vite.
  plugins: [react()], // Add the React plugin to the Vite build.
});
