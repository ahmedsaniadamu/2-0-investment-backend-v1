import { Sequelize } from "sequelize";
import configFile from "../config/config.js";

import InvestorsModel from './inverstors.js'
import InvestorsOtpModel from './investor-otp.js'
import PlanModel from './plan.js'

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

export const db = { 
  sequelize, Sequelize, Investors, InvestorOtps, Plan
};
// initialize associations
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});


