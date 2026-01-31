import express from 'express';
import isAuth from '../../middleware/auth.js';

const router = express.Router();

import {
    getInvestorTransactions, getTransactionSummary, getLoginLink
} from '../../controllers/transactionController.js';
import isInvestor from '../../middleware/isInvestor.js';

router.get("/:id", isAuth, isInvestor, getInvestorTransactions);
router.get("/summary/:id", isAuth, isInvestor, getTransactionSummary);
router.get("/get-login-link/:investmentId/:investorId", isAuth, isInvestor, getLoginLink);

export default router;