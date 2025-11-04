import express from 'express';
import isAdmin from '../middleware/isAdmin.js';
import isAuth from '../middleware/auth.js';
import isInvestor from '../middleware/isInvestor.js';
const router = express.Router();

import { 
    createInvestment, getInvestments, getInvestorInvestments
} from '../controllers/investmentController.js'

router.post("/", isAuth, isInvestor, createInvestment);
router.get("/admin", isAuth,isAdmin, getInvestments);
router.get("/:id", isAuth,isInvestor, getInvestorInvestments);

export default router;