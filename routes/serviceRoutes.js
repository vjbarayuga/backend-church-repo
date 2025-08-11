import express from "express";
import {
  getServices,
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus,
} from "../controllers/serviceController.js";

const router = express.Router();

// Public routes
router.get("/", getServices);
router.get("/public/:id", getServiceById);

// Admin routes
router.get("/admin", getAllServices);
router.get("/:id", getServiceById);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);
router.patch("/:id/toggle", toggleServiceStatus);

export default router;
