import express from 'express';
import {
    getInvestments,
    getInvestmentsSummary,
    getInvestorInvestments,
    getInvestorInvestmentsSummary,
} from '../../controllers/investmentController.js';

const router = express.Router();

router.get("/", getInvestments);
router.get("/summary", getInvestmentsSummary);
router.get("/:id/summary", getInvestorInvestmentsSummary);
router.get("/:id", getInvestorInvestments)


export default router;