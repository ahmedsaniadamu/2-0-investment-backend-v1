import express from 'express';
import isAuth from '../../middleware/auth.js';
import isInvestor from '../../middleware/isInvestor.js';
const router = express.Router();

import { uploadDocument } from '../../controllers/kycDocumentController.js';

router.post("/verify-kyc", isAuth, isInvestor, uploadDocument);

export default router;