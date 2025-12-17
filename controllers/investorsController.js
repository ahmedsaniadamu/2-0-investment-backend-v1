import { paginate } from "../helpers/pagination.js";
import { db } from "../models/index.js";
import { literal } from "sequelize";
import { parseError } from "../helpers/parseError.js";
import bcrypt from 'bcrypt';
import { sendMail } from "../services/authService.js";
import { subAdminOnboardingEmailTemplate } from "../templates/sub-admin-onboarding-template.js";
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

export const createUser = async (req, res, next) => {
  try {
    const {  name, email, password, userType, phone_number } = req.body;
          if(!userType || !name || !email ) return parseError(400, 'All fields are required', next);
           const isExist = await Investors.findOne({ where: { email, role: 'investor' } });
         if (isExist) return parseError(400, 'User Account/Role already exists as an investor', next);
         const role = await Investors.findOne({ where: { email, role: 'sub-admin' } });
         if(role) {
          let password_ = password || null
          let hashedPassword;
          if(password_) hashedPassword = await bcrypt.hash(password, 10);
         const user = await Investors.update(
           password_ ?
             {
               name,
               password: hashedPassword,
               userType: userType,
               phone_number: phone_number,
             }
           :
          {
            name,
            userType: userType,
            phone_number: phone_number,
          }, {
           where: { email, role: 'sub-admin' },
          });
          return res.status(201).json({ message: 'User updated successfully', user: {
            id: role?.id,
          } });
        }
        else {
          if(!password) return parseError(400, 'Password is required', next);
           const hashedPassword = await bcrypt.hash(password, 10);
          const user = await Investors.create({
            name,
            email,
            password: hashedPassword,
            role: 'sub-admin',
            userType: userType,
            phone_number: phone_number,
            isVerified: true,
          });
          await sendMail({
            fields: {name, email, password, role: userType}, 
            template: subAdminOnboardingEmailTemplate,
             subject: 'Welcome to 2-0 Investment',
          });
          return res.status(201).json({ message: 'User created successfully', user });
        }
     //send mail to the user
  } catch (error) {
    return parseError(500, error.message, next);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await paginate(Investors, req, {
      searchable: ["name", "email"],
      order: [["createdAt", "DESC"]],
      where: {role: 'sub-admin'},
      attributes: {
        exclude: ['password', 'index', 'role', 'isVerified'],
      }
    })
    res.status(200).json(users);
  } catch (error) {
    parseError(500, error.message, next);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await Investors.findByPk(req.params.id);
    if (!user) return parseError(404, "User not found", next);
    await user.destroy();
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    parseError(500, error.message, next);
  }
};