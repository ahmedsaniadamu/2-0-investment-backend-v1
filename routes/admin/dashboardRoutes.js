import express from "express";
import {
    getAdminDashboardSummary, getInvestmentDistribution, getRoiPerPlan
} from "../../controllers/dashboardController.js";
import { hasPermission } from "../../middleware/hasPermissions.js";
import { PERMISSIONS } from "../../helpers/permissionsMap.js";

const router = express.Router();

router.get("/summary", hasPermission(PERMISSIONS.DASHBOARD.VIEW) ,getAdminDashboardSummary);
router.get("/roi-per-plan", hasPermission(PERMISSIONS.DASHBOARD.VIEW), getRoiPerPlan);
router.get("/investment-distribution", hasPermission(PERMISSIONS.DASHBOARD.VIEW), getInvestmentDistribution);

export default router;