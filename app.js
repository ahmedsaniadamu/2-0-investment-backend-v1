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
import adminPermissionRoutes from './routes/admin/permissionRoutes.js'
import investorDashboardRoutes from './routes/investor/dashboardRoutes.js'
import adminUsersRoutes from './routes/admin/usersRoutes.js'
import uploadRoutes from './routes/shared/fileUploadRoutes.js'
import cors from "cors";
import { getPlans } from "./controllers/planController.js";
import isAdmin from "./middleware/isAdmin.js";
import isAuth from "./middleware/auth.js";
import isInvestor from "./middleware/isInvestor.js";
import { errorHandler } from "./middleware/errorHandler.js";

import dotenv from "dotenv";
dotenv.config();

 const app = express();
 app.use(cors());
 app.use(express.json());
 // unaunthenticated routes
 app.get('/api/v1/plans', getPlans)
 //unauthenticated routes end
 app.use("/api/v1/auth", authRoutes);
 app.use('/api/v1/upload', isAuth, uploadRoutes)
 //investor routes
 app.use('/api/v1/investor/dashboard', isAuth, isInvestor, investorDashboardRoutes);
 app.use('/api/v1/investor/investments', isAuth, isInvestor, investmentRoutes);
 app.use('/api/v1/investor/transactions', isAuth, isInvestor, transactionRoutes);
 app.use('/api/v1/investor/profile', isAuth, isInvestor, profileRoutes);
 app.use('/api/v1/investor/kyc', isAuth, isInvestor, investorKycRoutes);
 //admin routes
 app.use("/api/v1/admin/plans", isAuth, isAdmin, plansRoutes );
 app.use('/api/v1/admin/investments', isAuth, isAdmin, adminInvestmentRoutes);
 app.use('/api/v1/admin/transactions', isAuth, isAdmin, adminTransactionRoutes);
 app.use('/api/v1/admin/investors', isAuth, isAdmin, adminInvestorsRoutes);
 app.use('/api/v1/admin/kyc-management', isAuth, isAdmin, adminKycRoutes);
 app.use('/api/v1/admin/dashboard', isAuth, isAdmin, adminDashboardRoutes);
 app.use('/api/v1/admin/permission', isAuth, isAdmin, adminPermissionRoutes);
 app.use('/api/v1/admin/users', isAuth, isAdmin, adminUsersRoutes);
 // global error handler
 app.use(errorHandler);
app.listen(process.env.SERVER_PORT, () => console.log(`erver running on port ${process.env.SERVER_PORT}`));
