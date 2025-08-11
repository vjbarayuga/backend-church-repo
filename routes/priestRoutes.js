import express from "express";
import {
  getAllPriests,
  getPriestById,
  createPriest,
  updatePriest,
  deletePriest,
} from "../controllers/priestController.js";

const router = express.Router();

router.get("/", getAllPriests);
router.get("/:id", getPriestById);
router.post("/", createPriest);
router.put("/:id", updatePriest);
router.delete("/:id", deletePriest);

export default router;
