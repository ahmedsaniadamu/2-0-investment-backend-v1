import express from 'express';

const router = express.Router();

import { 
    createKycDocument, deleteKycDocument, getKycDocumentById,
     getKycDocuments, updateKycDocument,getInvestorsKycRequests, 
     reviewKycRequest,
     getInvestorsKycSummary
 } from '../../controllers/kycDocumentController.js';

router.get("/documents",  getKycDocuments);
router.get("/investors-kyc", getInvestorsKycRequests);
router.get("/investors/summary", getInvestorsKycSummary);
router.get("/documents/:id", getKycDocumentById);
router.post("/documents", createKycDocument);
router.post("/review-investor-kyc-request/:id", reviewKycRequest);
router.patch("/documents/:id", updateKycDocument);
router.delete("/documents/:id", deleteKycDocument);

export default router;
