import express from "express";
import { apiData, userData } from "../controllers/dataController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/api_data", apiData);
router.get("/user_data", authenticateUser, userData);

export default router;
