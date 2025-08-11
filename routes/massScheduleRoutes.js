import express from "express";
import {
  getAllMassSchedules,
  getMassScheduleById,
  createMassSchedule,
  updateMassSchedule,
  deleteMassSchedule,
} from "../controllers/massScheduleController.js";

const router = express.Router();

router.get("/", getAllMassSchedules);
router.get("/:id", getMassScheduleById);
router.post("/", createMassSchedule);
router.put("/:id", updateMassSchedule);
router.delete("/:id", deleteMassSchedule);

export default router;
