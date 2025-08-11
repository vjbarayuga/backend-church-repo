import express from "express";
import {
  registerAdmin,
  loginAdmin,
  verifyToken,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/verify-token", verifyToken);

export default router;
