import express from 'express';

const router = express.Router();

import { 
    createKycDocument, deleteKycDocument, getKycDocumentById,
     getKycDocuments, updateKycDocument,getInvestorsKycRequests, 
     reviewKycRequest,
     getInvestorsKycSummary
 } from '../../controllers/kycDocumentController.js';
import { hasPermission } from '../../middleware/hasPermissions.js';
import { PERMISSIONS } from '../../helpers/permissionsMap.js';

router.get("/documents", hasPermission(PERMISSIONS.KYC.DOCUMENTS.VIEW),  getKycDocuments);
router.get("/investors-kyc", hasPermission(PERMISSIONS.KYC.VIEW), getInvestorsKycRequests);
router.get("/investors/summary", hasPermission(PERMISSIONS.KYC.VIEW), getInvestorsKycSummary);
router.get("/documents/:id", hasPermission(PERMISSIONS.KYC.DOCUMENTS.VIEW), getKycDocumentById);
router.post("/documents", hasPermission(PERMISSIONS.KYC.DOCUMENTS.CREATE), createKycDocument);
router.post("/review-investor-kyc-request/:id", hasPermission(PERMISSIONS.KYC.REVIEW) ,reviewKycRequest);
router.patch("/documents/:id", hasPermission(PERMISSIONS.KYC.DOCUMENTS.UPDATE), updateKycDocument);
router.delete("/documents/:id", hasPermission(PERMISSIONS.KYC.DOCUMENTS.DELETE), deleteKycDocument);

export default router;
