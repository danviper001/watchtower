import { Router } from "express";
import upload from "../middleware/upload";

import {
  getProfile,
  getUserStats,
  uploadAvatar,
  updateProfile,
  changePassword,
} from "../controllers/userController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/me", protect, getProfile);

router.get("/stats", protect, getUserStats);

router.put("/avatar", protect, upload.single("avatar"), uploadAvatar);

router.put( "/me", protect, updateProfile);

router.put( "/change-password", protect, changePassword);

export default router;