import mongoose from "mongoose";
import { z } from "zod";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
});

const User = mongoose.model("users", userSchema);

export const registerValidationSchema = z
  .object({
    email: z.string().email().trim(),
    password: z.string().min(8).max(16).trim(),
    confirmPassword: z.string().min(8).max(16).trim(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginValidationSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).max(16).trim(),
});

export default User;
