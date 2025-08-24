// routes/historyRoutes.js

import express from "express";
import { getHistory, updateHistory } from "../controllers/historyController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getHistory);
router.put("/", upload.single("image"), updateHistory); // or use POST if preferred

export default router;
