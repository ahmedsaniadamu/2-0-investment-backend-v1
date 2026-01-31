import express from 'express';

const router = express.Router();

import {
    getTransactions, getTransactionById,
    reviewTransaction, getTransactionSummary, processPayout
} from '../../controllers/transactionController.js';
import { hasPermission } from '../../middleware/hasPermissions.js';
import { PERMISSIONS } from '../../helpers/permissionsMap.js';

router.get("/", hasPermission(PERMISSIONS.TRANSACTIONS.VIEW), getTransactions);
router.get("/summary", hasPermission(PERMISSIONS.TRANSACTIONS.VIEW), getTransactionSummary);
router.get("/:id/summary", hasPermission(PERMISSIONS.TRANSACTIONS.VIEW), getTransactionSummary);
router.get("/:id", hasPermission(PERMISSIONS.TRANSACTIONS.VIEW), getTransactionById);
router.patch("/review/:id", hasPermission(PERMISSIONS.TRANSACTIONS.REVIEW), reviewTransaction);
router.patch("/payout/:id", hasPermission(PERMISSIONS.TRANSACTIONS.REVIEW), processPayout);

export default router;