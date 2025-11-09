import express from 'express';
import isAuth from '../../middleware/auth.js';
import {
getInvestments,
getInvestorInvestments,
} from '../../controllers/investmentController.js';
import isAdmin from '../../middleware/isAdmin.js';

const router = express.Router();

router.get("/", getInvestments);
router.get("/:id", getInvestorInvestments)

export default router;