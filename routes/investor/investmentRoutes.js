import express from 'express';
import isAuth from '../../middleware/auth.js';
import isInvestor from '../../middleware/isInvestor.js';
const router = express.Router();

import {
    createInvestment, getInvestorInvestments
} from '../../controllers/investmentController.js';

router.post("/", isAuth, isInvestor, createInvestment);
router.get("/:id", isAuth,isInvestor, getInvestorInvestments);

export default router;