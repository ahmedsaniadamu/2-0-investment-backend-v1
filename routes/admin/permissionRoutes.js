import express from 'express';

const router = express.Router();

import {
    createPermission, getPermissions, assignPermissions
} from '../../controllers/permissionController.js';

router.post("/", createPermission);
router.get("/", getPermissions);
router.post("/assign-permissions", assignPermissions);

export default router;