import express from 'express';
const router = express.Router();

import {
    createInvestment, getInvestorInvestments,
    getInvestorInvestmentsSummary,
    requestWithdrawal
} from '../../controllers/investmentController.js';

router.post("/", createInvestment);
router.get("/:id/request-withdrawal", requestWithdrawal);
router.get("/:id/summary", getInvestorInvestmentsSummary);
router.get("/:id", getInvestorInvestments);

export default router;