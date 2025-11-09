import express from 'express';

const router = express.Router();

import {
    createPlan, getPlans, getPlanById, updatePlan,
    deletePlan, getPlanInvestments
} from '../../controllers/planController.js';

router.post("/", createPlan);
router.get("/", getPlans);
router.get("/investments/:id", getPlanInvestments);
router.get("/:id",getPlanById);
router.patch("/:id", updatePlan);
router.delete("/:id", deletePlan);

export default router;
