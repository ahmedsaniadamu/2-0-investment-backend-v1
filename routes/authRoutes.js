import express from 'express';

const router = express.Router();

import { 
    signup, login, verifyOtp, forgotPassword, 
    resendOtp, resetPassword} from '../controllers/authController.js';

router.post('/register', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/forgot-password', forgotPassword);
router.post('/resend-otp', resendOtp);
router.post('/reset-password', resetPassword);

export default router;