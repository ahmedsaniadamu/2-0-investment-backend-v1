import { Sequelize } from "sequelize";
import configFile from "../config/config.js";

import InvestorsModel from './inverstors.js'
import InvestorsOtpModel from './investor-otp.js'
import PlanModel from './plan.js'
import InvestmentModel from './investment.js'
import TransactionModel from './transaction.js'
import ProfileModel from './investor-profile.js'
import KycDocumentModel from './kyc-document.js'
import InvestorKycRequestModel from "./investor-kyc-request.js";

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Initialize models
const Investors = InvestorsModel(sequelize, Sequelize.DataTypes);
const InvestorOtps = InvestorsOtpModel(sequelize, Sequelize.DataTypes);
const Plan = PlanModel(sequelize, Sequelize.DataTypes);
const Investment = InvestmentModel(sequelize, Sequelize.DataTypes);
const Transaction = TransactionModel(sequelize, Sequelize.DataTypes);
const Profile = ProfileModel(sequelize, Sequelize.DataTypes);
const KycDocument = KycDocumentModel(sequelize, Sequelize.DataTypes);
const InvestorKycRequest = InvestorKycRequestModel(sequelize, Sequelize.DataTypes);

export const db = { 
  sequelize, Sequelize, Investors, InvestorOtps, Plan, Investment,
  Profile, Transaction, KycDocument, InvestorKycRequest,
};
// initialize associations
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});


