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
 app.get('/plans', getPlans)
 //unauthenticated routes end
 app.use("/auth", authRoutes);
 app.use('/upload', isAuth, uploadRoutes)
 //investor routes
 app.use('/investor/dashboard', isAuth, isInvestor, investorDashboardRoutes);
 app.use('/investor/investments', isAuth, isInvestor, investmentRoutes);
 app.use('/investor/transactions', isAuth, isInvestor, transactionRoutes);
 app.use('/investor/profile', isAuth, isInvestor, profileRoutes);
 app.use('/investor/kyc', isAuth, isInvestor, investorKycRoutes);
 //admin routes
 app.use("/admin/plans", isAuth, isAdmin, plansRoutes );
 app.use('/admin/investments', isAuth, isAdmin, adminInvestmentRoutes);
 app.use('/admin/transactions', isAuth, isAdmin, adminTransactionRoutes);
 app.use('/admin/investors', isAuth, isAdmin, adminInvestorsRoutes);
 app.use('/admin/kyc-management', isAuth, isAdmin, adminKycRoutes);
 app.use('/admin/dashboard', isAuth, isAdmin, adminDashboardRoutes);
 // global error handler
 app.use(errorHandler);
app.listen(1001, () => console.log("Server running on port 1001"));
