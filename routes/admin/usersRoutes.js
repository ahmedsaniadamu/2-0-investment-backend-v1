import express from 'express';

const router = express.Router();

import {
    createUser,
    getUsers,
    deleteUser
} from '../../controllers/investorsController.js';
import { hasPermission } from '../../middleware/hasPermissions.js';
import { PERMISSIONS } from '../../helpers/permissionsMap.js';

router.get("/", hasPermission(PERMISSIONS.USERS.VIEW), getUsers);
router.delete("/:id", hasPermission(PERMISSIONS.USERS.DELETE), deleteUser);
router.post("/create", hasPermission(PERMISSIONS.USERS.CREATE), createUser);

export default router;
