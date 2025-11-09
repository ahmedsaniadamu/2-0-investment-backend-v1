import express from 'express';

const router = express.Router();

import { 
    createKycDocument, deleteKycDocument, getKycDocumentById,
     getKycDocuments, updateKycDocument 
 } from '../../controllers/kycDocumentController.js';

router.get("/documents",  getKycDocuments);
router.get("/documents/:id", getKycDocumentById);
router.post("/documents", createKycDocument);
router.patch("/documents/:id", updateKycDocument);
router.delete("/documents/:id", deleteKycDocument);

export default router;
