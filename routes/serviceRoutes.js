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
import upload from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.get("/", getServices);
router.get("/public/:id", getServiceById);

// Admin routes
router.get("/admin", getAllServices);
router.get("/:id", getServiceById);
router.post("/", upload.single("image"), createService);
router.put("/:id", upload.single("image"), updateService);
router.delete("/:id", deleteService);
router.patch("/:id/toggle", toggleServiceStatus);

export default router;
