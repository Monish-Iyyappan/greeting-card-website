import express from "express"; // Import Express to create a router.
import { signup, login } from "../controllers/authController.js"; // Import signup and login handlers.

const router = express.Router(); // Create a new router.

router.post("/signup", signup); // Register the signup route.
router.post("/login", login); // Register the login route.

export default router; // Export the router to use in server.js.
