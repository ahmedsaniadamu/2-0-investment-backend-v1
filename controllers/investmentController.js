import { paginate } from "../helpers/pagination.js";
import { db } from "../models/index.js";
import { sendMail } from "../services/authService.js";
import { transactionPendingEmailTemplate } from "../templates/transaction-status-template.js";
import { parseError } from "../helpers/parseError.js";
import { addYears } from "date-fns";
import { Op } from "sequelize";
import stripe from "../config/stripe.js";
import dotenv from "dotenv";

dotenv.config();

const { Investment, Transaction, Investors, Plan, InvestorKycRequest, Profile } = db;

export const createInvestment = async (req, res, next) => {
  try {
    const newInvestment = await Investment.create(req.body);
    const {
      amount,
      paymentMethod,
      startDate,
      investmentGoal,
      planId,
      investorId
    } = req.body

    const investor = await Investors.findOne({ where: { id: investorId } });
    if (!investor) return parseError(404, 'Investor not found', next);

    const transaction = await Transaction.create({
      type: 'deposit',
      investmentGoal,
      amount,
      paymentMethod,
      startDate,
      status: 'pending',
      investmentId: newInvestment?.id,
      investorId,
      planId,
    });

    await sendMail({
      fields: {
        name: investor?.dataValues?.name || '',
        transactionId: transaction?.id, email: investor.email,
        dashboardLink: `${process.env.DASHBOARD_REDIRECT_URL}/login?action=view-transactions`
      },
      subject: "Transaction Review Status - 2Zero Investment",
      template: transactionPendingEmailTemplate
    });

    res.status(201).json({
      message: `Investment created successfully transaction will be reviewed by admin. you will recieve an email notification once review is completed.`,
      success: true, data: newInvestment
    });
  } catch (error) {
    next(error);
  }
};

export const getInvestments = async (req, res, next) => {
  try {
    const result = await paginate(Investment, req, {
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ['index'] },
      include: [
        { model: Plan, attributes: ['name', 'roi'], as: 'plan', searchable: ['name'], },
        {
          model: Investors, attributes: ['name', 'email', 'phone_number'],
          as: 'investor', searchable: ['name', 'email', 'phone_number'],
        }
      ]
    });
    if (!result) return parseError(404, "Investments not found", next);
    let investment = {
      ...result, data: result.data.map((i) => {
        function updateInvestmentStatus(investment) {
          const startDate = new Date(investment.startDate);
          const today = new Date();
          const oneYearLater = new Date(startDate);
          oneYearLater.setFullYear(startDate.getFullYear() + 1);

          if (today >= oneYearLater && investment.status === 'active') {
            return 'completed';
          }
          else return investment.status;
        }
        return { ...JSON.parse(JSON.stringify(i)), status: updateInvestmentStatus(i) }
      })
    };
    res.status(200).json(investment);
  } catch (error) {
    next(error);
  }
};

export const getInvestorInvestments = async (req, res, next) => {
  try {
    const investments = await paginate(Investment, req, {
      where: { investorId: req.params.id },
      searchable: ["investmentGoal"],
      attributes: { exclude: ['investorId', 'updatedAt', 'reason'] },
      include: [
        { model: Plan, attributes: ['name', 'roi'], as: 'plan', searchable: ['name'] }
      ]
    });
    if (!investments) return parseError(404, "Investments not found", next);
    let investment = {
      ...investments, data: investments.data.map((i) => {
        function updateInvestmentStatus(investment) {
          const startDate = new Date(investment.startDate);
          const today = new Date();
          const oneYearLater = new Date(startDate);
          oneYearLater.setFullYear(startDate.getFullYear() + 1);

          if (today >= oneYearLater && investment.status === 'active') {
            return 'completed';
          }
          else return investment.status;
        }
        return { ...JSON.parse(JSON.stringify(i)), status: updateInvestmentStatus(i) }
      })
    };
    res.status(200).json(investment);
  } catch (error) {
    next(error);
  }
};

export const getInvestmentsSummary = async (req, res, next) => {
  try {
    const amount = await Investment.sum('amount');
    const count = await Investment.count();
    const now = new Date();
    const oneYearAgo = addYears(now, -1);
    // const completed = await Investment.count({where: { status: 'completed'}});
    const completed = await Investment.count({
      where: {
        status: "active",
        startDate: { [Op.lte]: oneYearAgo }
      }
    });
    const pending = await Investment.count({ where: { status: 'pending' } });
    const rejected = await Investment.count({ where: { status: 'cancelled' } });
    const active = await Investment.count({ where: { status: 'active' } });
    return res.json({ amount, count, completed, pending, rejected, active })
  } catch (error) {
    next(error);
  }
}

export const getInvestorInvestmentsSummary = async (req, res, next) => {
  try {
    const investorId = req.params.id
    const amount = await Investment.sum('amount', { where: { investorId: investorId } });
    const count = await Investment.count({ where: { investorId: investorId } });
    const now = new Date();
    const oneYearAgo = addYears(now, -1);
    const completed = await Investment.count({
      where: {
        status: "active",
        startDate: { [Op.lte]: oneYearAgo },
        investorId: investorId
      }
    });
    // const completed = await Investment.count({where: {investorId: investorId, status: 'completed'}});
    const pending = await Investment.count({ where: { investorId: investorId, status: 'pending' } });
    const rejected = await Investment.count({ where: { investorId: investorId, status: 'cancelled' } });
    const active = await Investment.count({ where: { investorId: investorId, status: 'active' } });
    return res.json({ amount, count, completed, pending, rejected, active })
  } catch (error) {
    next(error);
  }
}

export const requestWithdrawal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({ where: { investmentId: id, type: "deposit" } });
    if (!transaction) return parseError(404, "Transaction not found", next);
    if (transaction?.dataValues?.status !== 'approved') return parseError(400, "Transaction is not approved for this investment", next);
    const kycStatus = await InvestorKycRequest.findOne({ where: { investorId: transaction.investorId } });
    if (!kycStatus) return parseError(404, "Kyc not found", next);
    if (kycStatus.status !== "approved") return parseError(400, "Kyc not approved yet. Please complete kyc first", next);
    const investment = await Investment.findOne({ where: { id }, include: [{ model: Plan, as: "plan" }] });
    if (!investment) return parseError(404, "Investment not found", next);
    const isTimelineCompleted = () => {
      const startDate = new Date(investment.startDate);
      const currentDate = new Date();
      // Calculate end date (1 year from start)
      const endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1);
      // Format expected withdrawal date
      const expectedWithdrawalDate = endDate.toLocaleDateString()
      if (currentDate.getTime() > new Date(expectedWithdrawalDate).getTime()) {
        return true
      }
      return false
    };
    const averageRoi = () => {
      const [min, max] = investment?.dataValues?.plan?.roi?.replace("%", "").split("-").map(Number);
      const avgRoi = (min + max) / 2;
      return avgRoi.toFixed(2);
    }
    const withdrawalAmount = parseFloat(investment?.dataValues?.amount) + ((parseFloat(investment?.dataValues?.amount) * averageRoi()) / 100)
    if (!isTimelineCompleted()) return parseError(400, "Withdrawal request can only be made after 1 year", next);
    //check for duplicate withdrawal request
    const existingWithdrawalRequest = await Transaction.findOne({ where: { investmentId: id, isWithdrawalRequest: true, type: "withdraw" } });
    if (existingWithdrawalRequest) return parseError(400, "Withdrawal request already exists, please wait for review", next);
    //create transaction for withdrawal
    const { id: txn, reason, createAt, updatedAt, ...rest } = transaction?.dataValues

    await Transaction.create({
      ...rest, isWithdrawalRequest: true, type: "withdraw",
      amount: withdrawalAmount, status: "pending",
      transactionId: null,
    });
    await Investment.update({ isWithdrawalSent: true }, { where: { id } });
    res.status(200).json({
      message: `Withdrawal request sent successfully. 
         you will recieve an email notification once review is completed.`,
      success: true, data: transaction
    });
  } catch (error) {
    next(error);
  }
}

export const createPaymentIntent = async (req, res, next) => {
  try {
    const {
      amount, currency = 'usd',
      investorId, planId, paymentMethod,
      startDate, investmentGoal,
      agreement,
    } = req.body;
    if (
      !amount || !currency || !investorId || !planId || !paymentMethod || !startDate || !investmentGoal || !agreement
    ) return parseError(400, "amount, currency, investorId, planId, paymentMethod, startDate, investmentGoal, agreement are required", next);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    //    if (start < today) return parseError(400, "Start date cannot be in the past", next);
    const plan = await Plan.findOne({ where: { id: planId } });
    if (!plan) return parseError(404, "Plan not found", next);
    if (amount < plan.minDeposit) return parseError(400, `Amount is less than minimum deposit of this plan ${plan.minDeposit}`, next);
    if (amount > plan.maxDeposit) return parseError(400, `Amount is more than maximum deposit of this plan ${plan.maxDeposit}`, next);
    const investor = await Investors.findOne({ where: { id: investorId } });
    if (!investor) return parseError(404, "Investor not found", next);
    const profile = await Profile.findOne({ where: { investorId: investorId } });
    if (!profile) return parseError(404, "Profile not found", next);
    if (investor.role !== "investor") return parseError(400, "Invalid investor", next);
    if (investor.isVerified !== true) return parseError(400, "Investor Account is not verified", next);
    const amountInCents = amount * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        investorId,
        type: 'investment',
        planId,
        amount: amountInCents,
        paymentMethod,
        startDate,
        investmentGoal,
        agreement,
      }
    });
    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    next(error);
  }
}
