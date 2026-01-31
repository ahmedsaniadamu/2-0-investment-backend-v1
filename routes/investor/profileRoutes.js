import express from 'express';
const router = express.Router();

import { getProfile, updatePassword, updateProfile, checkProfileExists } from '../../controllers/profileController.js';

router.get("/:id", getProfile);
router.patch("/password/:id", updatePassword);
router.patch("/:id", updateProfile);
router.get("/check/:id", checkProfileExists);

export default router;