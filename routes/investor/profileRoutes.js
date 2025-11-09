import express from 'express';
const router = express.Router();

import { getProfile, updatePassword, updateProfile } from '../../controllers/profileController.js';

router.get("/:id", getProfile);
router.patch("/password/:id", updatePassword);
router.patch("/:id", updateProfile);

export default router;