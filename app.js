import express from "express";
import authRoutes from "./routes/shared/authRoutes.js";
import plansRoutes from "./routes/admin/planRoutes.js";
import investmentRoutes from "./routes/investor/investmentRoutes.js";
import profileRoutes from "./routes/investor/profileRoutes.js";
import adminInvestmentRoutes from "./routes/admin/investmentRoutes.js";
import transactionRoutes from './routes/investor/transactionRoutes.js'
import adminTransactionRoutes from './routes/admin/transactionRoutes.js'
import adminInvestorsRoutes from './routes/admin/investorsRoutes.js'
import adminDashboardRoutes from './routes/admin/dashboardRoutes.js'
import adminKycRoutes from './routes/admin/kycRoutes.js'
import investorKycRoutes from './routes/investor/kycRoutes.js'
import investorDashboardRoutes from './routes/investor/dashboardRoutes.js'
import uploadRoutes from './routes/shared/fileUploadRoutes.js'
import cors from "cors";
import { getPlans } from "./controllers/planController.js";
import isAdmin from "./middleware/isAdmin.js";
import isAuth from "./middleware/auth.js";
import isInvestor from "./middleware/isInvestor.js";
import { errorHandler } from "./middleware/errorHandler.js";

 const app = express();
 app.use(cors());
 app.use(express.json());
 // unaunthenticated routes
 app.get('/api/plans', getPlans)
 //unauthenticated routes end
 app.use("/api/auth", authRoutes);
 app.use('/api/upload', isAuth, uploadRoutes)
 //investor routes
 app.use('/api/investor/dashboard', isAuth, isInvestor, investorDashboardRoutes);
 app.use('/api/investor/api/investments', isAuth, isInvestor, investmentRoutes);
 app.use('/api/investor/transactions', isAuth, isInvestor, transactionRoutes);
 app.use('/api/investor/profile', isAuth, isInvestor, profileRoutes);
 app.use('/api/investor/kyc', isAuth, isInvestor, investorKycRoutes);
 //admin routes
 app.use("/api/admin/plans", isAuth, isAdmin, plansRoutes );
 app.use('/api/admin/investments', isAuth, isAdmin, adminInvestmentRoutes);
 app.use('/api/admin/transactions', isAuth, isAdmin, adminTransactionRoutes);
 app.use('/api/admin/investors', isAuth, isAdmin, adminInvestorsRoutes);
 app.use('/api/admin/kyc-management', isAuth, isAdmin, adminKycRoutes);
 app.use('/api/admin/dashboard', isAuth, isAdmin, adminDashboardRoutes);
 // global error handler
 app.use(errorHandler);
app.listen(1001, () => console.log("Server running on port 1001"));
