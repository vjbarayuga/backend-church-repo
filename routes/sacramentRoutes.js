import express from "express";
import {
  getSacraments,
  getAllSacraments,
  getSacramentByName,
  getSacramentById,
  createSacrament,
  updateSacrament,
  deleteSacrament,
  toggleSacramentStatus,
} from "../controllers/sacramentController.js";

const router = express.Router();

// Public routes
router.get("/", getSacraments);
router.get("/name/:name", getSacramentByName);
router.get("/public/:id", getSacramentById);

// Admin routes
router.get("/admin", getAllSacraments);
router.get("/:id", getSacramentById);
router.post("/", createSacrament);
router.put("/:id", updateSacrament);
router.delete("/:id", deleteSacrament);
router.patch("/:id/toggle", toggleSacramentStatus);

export default router;
