import express from 'express';
const router = express.Router();
import { createFeedback, getInvestorFeedbacks } from '../../controllers/supportAndFeedbackController.js';

router.post("/", createFeedback);
router.get("/:investorId", getInvestorFeedbacks);

export default router;
