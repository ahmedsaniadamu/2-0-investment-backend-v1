import express from 'express';
const router = express.Router();
import { getAllFeedbacks, deleteFeedback, getFeedbackSummary } from '../../controllers/supportAndFeedbackController.js';

router.get("/", getAllFeedbacks);
router.delete("/:id", deleteFeedback);
router.get("/summary", getFeedbackSummary);

export default router;
