import express from "express";
import {
  login,
  register,
  tokenChange,
  logout,
} from "../controllers/authController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/tokenChange", tokenChange);
router.delete("/logout", authenticateUser, logout);

export default router;
