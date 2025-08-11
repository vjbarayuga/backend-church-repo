import express from "express";
import upload from "../middleware/upload.js";
import { uploadImage } from "../controllers/slideshowController.js";
import {
  getPageContent,
  getAllPageContents,
  upsertPageContent,
  deletePageContent,
} from "../controllers/pageContentController.js";

const router = express.Router();

// Public routes
router.get("/:pageName", getPageContent);

// File upload route (shared with slideshow)
router.post("/upload", upload.single("image"), uploadImage);

// Admin routes
router.get("/", getAllPageContents);
router.put("/:pageName", upsertPageContent);
router.delete("/:pageName", deletePageContent);

export default router;
