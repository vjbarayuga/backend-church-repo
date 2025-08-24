import express from "express";

import {
  getAllPriests,
  getPriestById,
  createPriest,
  updatePriest,
  deletePriest,
} from "../controllers/priestController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getAllPriests);
router.get("/:id", getPriestById);
router.post("/", upload.single("photo"), createPriest);
router.put("/:id", upload.single("photo"), updatePriest);
router.delete("/:id", deletePriest);

export default router;
