import express from 'express';
import { deleteFeedback, getAllFeedbacks, getFeedbackSummary } from '../../controllers/supportAndFeedbackController.js';
import { hasPermission } from '../../middleware/hasPermissions.js';
import { PERMISSIONS } from '../../helpers/permissionsMap.js';
const router = express.Router();

router.get("/", hasPermission(PERMISSIONS.INVESTORS.VIEW_FEEDBACKS), getAllFeedbacks);
router.delete("/:id", hasPermission(PERMISSIONS.INVESTORS.DELETE_FEEDBACK), deleteFeedback);
router.get("/summary", hasPermission(PERMISSIONS.INVESTORS.VIEW_FEEDBACKS), getFeedbackSummary);

export default router;
