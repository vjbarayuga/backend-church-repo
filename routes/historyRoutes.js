// routes/historyRoutes.js
import express from 'express';
import { getHistory, updateHistory } from '../controllers/historyController.js';

const router = express.Router();

router.get('/', getHistory);
router.put('/', updateHistory); // or use POST if preferred

export default router;
