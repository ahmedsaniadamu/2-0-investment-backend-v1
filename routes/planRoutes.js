import express from 'express';
import isAdmin from '../middleware/isAdmin.js';
import isAuth from '../middleware/auth.js';

const router = express.Router();

import { 
    createPlan, getPlans, getPlanById, updatePlan,
     deletePlan, getPlanInvestments 
} from '../controllers/planController.js' 

router.post("/", isAuth, isAdmin, createPlan);
router.get("/", getPlans);
router.get("/investments/:id", isAuth, isAdmin, getPlanInvestments);
router.get("/:id", isAuth, isAdmin ,getPlanById);
router.patch("/:id", isAuth, isAdmin, updatePlan);
router.delete("/:id", isAuth, isAdmin, deletePlan);

export default router;
