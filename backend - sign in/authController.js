import bcrypt from "bcrypt"; // Import bcrypt to hash and compare passwords.
import authRoutes from "../backend - sign in/authRoutes.js";
import { findUserByUsername, createUser } from "../backend - sign in/userModel.js"; // Import user database functions.

const SALT_ROUNDS = 10; // Set how many salt rounds bcrypt should use.

export async function signup(req, res, next) { // Handle sign up requests.
  try {
    const { username, password, confirmPassword } = req.body; // Get the sign up fields from the request.
    const trimmedUsername = username?.trim(); // Remove spaces around the username.

    if (!trimmedUsername) { // Check if the username is empty.
      return res.status(400).json({ // Send a bad request response.
        success: false, // Indicate the call failed.
        message: "Username cannot be empty.", // Explain the missing username.
      });
    }

    if (!password?.trim()) { // Check if the password is empty.
      return res.status(400).json({ // Send a bad request response.
        success: false, // Indicate the call failed.
        message: "Password cannot be empty.", // Explain the missing password.
      });
    }

    if (!confirmPassword?.trim()) { // Check if the confirm password is empty.
      return res.status(400).json({ // Send a bad request response.
        success: false, // Indicate the call failed.
        message: "Confirm Password cannot be empty.", // Explain the missing confirmation.
      });
    }

    if (password !== confirmPassword) { // Check whether both passwords match.
      return res.status(400).json({ // Send a bad request response.
        success: false, // Indicate the call failed.
        message: "Passwords do not match.", // Explain the mismatch.
      });
    }

    const existingUser = await findUserByUsername(trimmedUsername); // Check if the username already exists.
    if (existingUser) { // If a user was found,
      return res.status(409).json({ // return a conflict response.
        success: false, // Indicate the call failed.
        message: "Username already exists.", // Tell the frontend the username is taken.
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); // Hash the password before saving.
    await createUser(trimmedUsername, hashedPassword); // Insert the new user into the database.

    return res.status(201).json({ // Return a success response.
      success: true, // Indicate the call succeeded.
      message: "Sign up successful.", // Provide a success message.
    });
  } catch (error) { // Catch any errors during sign up.
    next(error); // Forward the error to the error handler.
  }
}

export async function login(req, res, next) { // Handle login requests.
  try {
    const { username, password } = req.body; // Get the login fields from the request.
    const trimmedUsername = username?.trim(); // Remove spaces around the username.

    if (!trimmedUsername) { // Check if the username is empty.
      return res.status(400).json({ // Send a bad request response.
        success: false, // Indicate the call failed.
        message: "Username cannot be empty.", // Explain the missing username.
      });
    }

    if (!password?.trim()) { // Check if the password is empty.
      return res.status(400).json({ // Send a bad request response.
        success: false, // Indicate the call failed.
        message: "Password cannot be empty.", // Explain the missing password.
      });
    }

    const user = await findUserByUsername(trimmedUsername); // Look up the user by username.
    if (!user) { // If no user exists,
      return res.status(404).json({ // return a not found response.
        success: false, // Indicate the call failed.
        message: "User does not exist.", // Tell the frontend the user was not found.
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the entered password to the stored hash.
    if (!isPasswordValid) { // If the password is wrong,
      return res.status(401).json({ // return an unauthorized response.
        success: false, // Indicate the call failed.
        message: "Incorrect password.", // Tell the frontend the password was incorrect.
      });
    }

    return res.status(200).json({ // Return a success response.
      success: true, // Indicate the call succeeded.
      message: "Login successful", // Provide a success message.
    });
  } catch (error) { // Catch any errors during login.
    next(error); // Forward the error to the error handler.
  }
}
