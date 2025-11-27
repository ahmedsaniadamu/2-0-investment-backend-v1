import express from 'express';
const router = express.Router();

import { getKycDocuments, uploadDocument } from '../../controllers/kycDocumentController.js';

router.get("/documents",  getKycDocuments);
router.post("/verify-kyc",uploadDocument);

export default router;