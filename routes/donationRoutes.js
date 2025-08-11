import express from "express";
import {
  getAllDonations,
  getDonationById,
  createDonation,
  updateDonation,
  deleteDonation,
} from "../controllers/donationController.js";

const router = express.Router();

router.get("/", getAllDonations);
router.get("/:id", getDonationById);
router.post("/", createDonation);
router.put("/:id", updateDonation);
router.delete("/:id", deleteDonation);

export default router;
