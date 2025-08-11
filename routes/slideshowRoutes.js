import express from "express";
import upload from "../middleware/upload.js";
import {
  getSlides,
  getAllSlides,
  createSlide,
  updateSlide,
  deleteSlide,
  toggleSlideStatus,
  uploadImage,
} from "../controllers/slideshowController.js";

const router = express.Router();

// Public routes
router.get("/", getSlides); // Get only active slides for public display

// File upload route
router.post("/upload", upload.single("image"), uploadImage);

// Admin routes (you should add authentication middleware here)
router.get("/admin", getAllSlides); // Get all slides for admin
router.post("/", createSlide);
router.put("/:id", updateSlide);
router.delete("/:id", deleteSlide);
router.patch("/:id/toggle", toggleSlideStatus);

export default router;
