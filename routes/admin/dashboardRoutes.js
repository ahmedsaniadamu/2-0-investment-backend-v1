import express from "express";
import {
    getAdminDashboardSummary, getInvestmentDistribution, getRoiPerPlan
} from "../../controllers/dashboardController.js";

const router = express.Router();

router.get("/summary", getAdminDashboardSummary);
router.get("/roi-per-plan", getRoiPerPlan);
 router.get("/investment-distribution", getInvestmentDistribution);

export default router;