import { paginate } from "../helpers/pagination.js";
import { db } from "../models/index.js";
import { literal } from "sequelize";
import { parseError } from "../helpers/parseError.js";

const {Investors, Investment, InvestorKycRequest } = db;
 
export const getInvestors = async (req, res, next) => {
  try {
    const investors = await paginate(Investors, req, {
      searchable: ["name", "email"],
      order: [["createdAt", "DESC"]],
      where: {role: 'investor'},
      include: [
        { model: InvestorKycRequest, as: 'kycRequests', attributes: ['status'] }
      ],
      attributes: {
        exclude: ['password', 'index', 'role'], 
        include: [
          [
            literal(`(
              SELECT COUNT(*)::INTEGER 
              FROM "Investments" AS investments 
              WHERE investments."investorId" = "Investors"."id"
            )`),
            "investmentCount"
          ],
          [
            literal(`(
              SELECT COALESCE(SUM(investments."amount")::FLOAT, 0)
              FROM "Investments" AS investments 
              WHERE investments."investorId" = "Investors"."id"
            )`),
            "totalInvestmentAmount"
          ]
        ],
      },
    });

    res.status(200).json(investors);
  } catch (error) {
    next(error);
  }
};

export const getInvestorsSummary = async (req, res, next) => {
  try {
    const [totalInvestors, verified, unverified] = await Promise.all(
      [Investors.count({ where: { role: "investor" } }),  
      Investors.count({ where: { role: "investor", isVerified: true } }),
      Investors.count({ where: { role: "investor", isVerified: false } }),]
    );

    res.status(200).json({
      totalInvestors,
      verified,
      unverified,
    });

  } catch (error) {
    next(error);
  }
};