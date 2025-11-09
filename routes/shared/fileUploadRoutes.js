import express from "express";
import upload from "../../middleware/upload.js"
import { uploadDocument } from "../../controllers/fileUploadController.js"; 

const router = express.Router();

router.post("/kyc-document", upload.single("file"), uploadDocument);

export default router;
