import express from "express";
import {
  getAllReadings,
  getReadingByDate,
  getTodaysReading,
  createReading,
  updateReading,
  deleteReading,
  autoFetchReadings,
} from "../controllers/readingController.js";

const router = express.Router();

// Public routes
router.get("/", getAllReadings);
router.get("/today", getTodaysReading);
router.get("/date/:date", getReadingByDate);

// Admin routes (you might want to add authentication middleware here)
router.post("/", createReading);
router.put("/:id", updateReading);
router.delete("/:id", deleteReading);
router.post("/auto-fetch", autoFetchReadings);

export default router;
