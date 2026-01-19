import express from 'express';

const router = express.Router();

import {
    createPlan, getPlans, getPlanById, updatePlan,
    deletePlan, getPlanInvestments,
    getPlansAdmin
} from '../../controllers/planController.js';
import { hasPermission } from '../../middleware/hasPermissions.js';
import { PERMISSIONS } from '../../helpers/permissionsMap.js';

router.post("/", hasPermission(PERMISSIONS.PLANS.CREATE), createPlan);
router.get("/", hasPermission(PERMISSIONS.PLANS.VIEW), getPlansAdmin);

router.get("/investments/:id", hasPermission(PERMISSIONS.PLANS.VIEW), getPlanInvestments);

router.get("/:id", hasPermission(PERMISSIONS.PLANS.VIEW), getPlanById);
router.patch("/:id", hasPermission(PERMISSIONS.PLANS.UPDATE), updatePlan);
//router.delete("/:id", deletePlan);

export default router;
