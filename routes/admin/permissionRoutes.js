import express from 'express';

const router = express.Router();

import {
    createPermission, getPermissions, assignPermissions,
    getUserPermissions,
    updateUserPermissions
} from '../../controllers/permissionController.js';
import { hasPermission } from '../../middleware/hasPermissions.js';
import { PERMISSIONS } from '../../helpers/permissionsMap.js';

router.post("/", hasPermission(PERMISSIONS.PERMISSIONS.CREATE), createPermission);
router.get("/", hasPermission(PERMISSIONS.PERMISSIONS.VIEW) ,getPermissions);
router.post("/assign-permissions", hasPermission(PERMISSIONS.PERMISSIONS.ASSIGN) ,assignPermissions);
router.get("/user-permssions/:userId", hasPermission(PERMISSIONS.USERS.VIEW), getUserPermissions);
router.patch("/update-user-permissions", hasPermission(PERMISSIONS.PERMISSIONS.ASSIGN), updateUserPermissions);

export default router;