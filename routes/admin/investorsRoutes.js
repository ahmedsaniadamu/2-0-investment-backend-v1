import express from 'express';

const router = express.Router();

import {
   getInvestors,
   getInvestorsSummary,
} from '../../controllers/investorsController.js';
import { getInvestorInvestments } from '../../controllers/investmentController.js';
import { getInvestorTransactions } from '../../controllers/transactionController.js';

router.get("/",  getInvestors);
router.get("/summary", getInvestorsSummary);
router.get("/:id/transactions", getInvestorTransactions);
router.get("/:id/investments", getInvestorInvestments);

export default router;
