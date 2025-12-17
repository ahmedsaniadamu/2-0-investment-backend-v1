import express from 'express';

const router = express.Router();

import {
   getInvestors,
   getInvestorsSummary,
} from '../../controllers/investorsController.js';
import { getInvestorInvestments } from '../../controllers/investmentController.js';
import { getInvestorTransactions } from '../../controllers/transactionController.js';
import { getProfile } from '../../controllers/profileController.js';
import { hasPermission } from '../../middleware/hasPermissions.js';
import { PERMISSIONS } from '../../helpers/permissionsMap.js';

router.get("/", hasPermission(PERMISSIONS.INVESTORS.VIEW) ,  getInvestors);
router.get("/summary", hasPermission(PERMISSIONS.INVESTORS.VIEW) , getInvestorsSummary);
router.get("/:id/transactions", hasPermission(PERMISSIONS.INVESTORS.VIEW_TRANSACTIONS), getInvestorTransactions);
router.get("/:id/investments", hasPermission(PERMISSIONS.INVESTORS.VIEW_INVESTMENTS) ,getInvestorInvestments);
router.get("/:id/profile", hasPermission(PERMISSIONS.INVESTORS.VIEW_PROFILE), getProfile);

export default router;
