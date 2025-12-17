import express from 'express';
import {
    getInvestments,
    getInvestmentsSummary,
    getInvestorInvestments,
    getInvestorInvestmentsSummary,
} from '../../controllers/investmentController.js';
import { hasPermission } from '../../middleware/hasPermissions.js';
import { PERMISSIONS } from '../../helpers/permissionsMap.js';

const router = express.Router();

router.get("/", hasPermission(PERMISSIONS.INVESTMENTS.VIEW), getInvestments);
router.get("/summary", hasPermission(PERMISSIONS.INVESTMENTS.VIEW) ,getInvestmentsSummary);
router.get("/:id/summary", hasPermission(PERMISSIONS.INVESTORS.VIEW_INVESTMENTS), getInvestorInvestmentsSummary);
router.get("/:id", hasPermission(PERMISSIONS.INVESTORS.VIEW_INVESTMENTS) ,getInvestorInvestments)

export default router;