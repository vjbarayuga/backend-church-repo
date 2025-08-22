import express from "express";

import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
// Use 'image' as the field name for hero image
router.post("/", upload.single("image"), createEvent);
router.put("/:id", upload.single("image"), updateEvent);
router.delete("/:id", deleteEvent);

export default router;
