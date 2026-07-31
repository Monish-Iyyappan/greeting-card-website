import bcrypt from "bcrypt";
import { findUserByUsername, createUser } from "../models/userModel.js";

const SALT_ROUNDS = 10;

export async function signup(req, res, next) {
  try {
    const { username, password, confirmPassword } = req.body;
    const trimmedUsername = username?.trim();

    if (!trimmedUsername) {
      return res.status(400).json({
        success: false,
        message: "Username cannot be empty.",
      });
    }

    if (!password?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Password cannot be empty.",
      });
    }

    if (!confirmPassword?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Confirm Password cannot be empty.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const existingUser = await findUserByUsername(trimmedUsername);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await createUser(trimmedUsername, hashedPassword);

    return res.status(201).json({
      success: true,
      message: "Sign up successful.",
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const trimmedUsername = username?.trim();

    if (!trimmedUsername) {
      return res.status(400).json({
        success: false,
        message: "Username cannot be empty.",
      });
    }

    if (!password?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Password cannot be empty.",
      });
    }

    const user = await findUserByUsername(trimmedUsername);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
}
