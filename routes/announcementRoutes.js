// routes/announcementRoutes.js
import express from "express";

import {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllAnnouncements);
router.get("/:id", getAnnouncementById);
// Use 'image' as the field name for hero image
router.post("/", upload.single("image"), createAnnouncement);
router.put("/:id", upload.single("image"), updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

export default router;
