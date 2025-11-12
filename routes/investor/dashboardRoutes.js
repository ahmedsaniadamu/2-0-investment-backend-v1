import express from "express";
import { 
    getInvestmentVsProfit, getInvestorProfitGrowth,
     getInvestorSummary, getPortfolioAllocation 
} from "../../controllers/dashboardController.js";

const router = express.Router();

router.get("/:investorId/summary", getInvestorSummary);
router.get("/:investorId/monhly-profit-growth", getInvestorProfitGrowth);
router.get("/:investorId/investment-vs-profit", getInvestmentVsProfit);
router.get("/:investorId/portfolio-allocation", getPortfolioAllocation);

export default router;