import express from 'express';
const router = express.Router();

import {
    createInvestment, createPaymentIntent, getInvestorInvestments,
    getInvestorInvestmentsSummary,
    requestWithdrawal
} from '../../controllers/investmentController.js';

router.post("/", createInvestment);
router.get("/:id/request-withdrawal", requestWithdrawal);
router.get("/:id/summary", getInvestorInvestmentsSummary);
router.get("/:id", getInvestorInvestments);
router.post("/create-payment-intent", createPaymentIntent);

export default router;