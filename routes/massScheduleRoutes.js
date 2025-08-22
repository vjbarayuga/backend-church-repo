import express from "express";

import {
  getAllMassSchedules,
  getMassScheduleById,
  createMassSchedule,
  updateMassSchedule,
  deleteMassSchedule,
} from "../controllers/massScheduleController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllMassSchedules);
router.get("/:id", getMassScheduleById);
router.post("/", upload.single("image"), createMassSchedule);
router.put("/:id", upload.single("image"), updateMassSchedule);
router.delete("/:id", deleteMassSchedule);

export default router;
