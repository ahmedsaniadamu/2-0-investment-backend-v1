import express from 'express';

const router = express.Router();

import {
    getTransactions, getTransactionById,
    reviewTransaction, getTransactionSummary
} from '../../controllers/transactionController.js';

router.get("/",getTransactions);
router.get("/summary",getTransactionSummary);
router.get("/:id/summary",getTransactionSummary);
router.get("/:id",getTransactionById);
router.patch("/review/:id",reviewTransaction);

export default router;