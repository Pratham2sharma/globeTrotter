import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile/:userId", getUserProfile);

export default router;
