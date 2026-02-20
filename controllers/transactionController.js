import { paginate } from "../helpers/pagination.js";
import { db } from "../models/index.js";
import { Op } from "sequelize";
import { sendMail } from "../services/authService.js";
import { transactionApprovedEmailTemplate, transactionRejectedEmailTemplate, investorOnboardingEmailTemplate } from "../templates/transaction-status-template.js";
import { parseError } from "../helpers/parseError.js";
import stripe from "../config/stripe.js";
import dotenv from "dotenv";

dotenv.config();

const { Transaction, Plan, Investors, Investment, Profile, InvestorKycRequest } = db;

export const getInvestorTransactions = async (req, res, next) => {
  try {
    const transactions = await paginate(Transaction, req, {
      searchable: ["investmentGoal"],
      order: [["createdAt", "DESC"]],
      where: { investorId: req.params.id },
      attributes: { exclude: ['reason', 'isWithdrawalRequest'] },
      include: [
        { model: Plan, attributes: ['name'], as: 'Plan' }
      ]
    });

    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req, res, next) => {
  const { status, paymentMethod, startDateFrom, startDateTo, createdFrom, createdTo, transactionId } = req.query;
  const type = req.query.type || ''
  const filters = {};
  if (status) {
    filters.status = status;
  }
  if (transactionId) {
    filters.transactionId = { [Op.like]: `%${transactionId}%` };
  }
  if (paymentMethod) {
    filters.paymentMethod = paymentMethod;
  }
  if (startDateFrom && startDateTo) {
    filters.startDate = {
      [Op.between]: [new Date(startDateFrom), new Date(startDateTo)],
    };
  } else if (startDateFrom) {
    filters.startDate = { [Op.gte]: new Date(startDateFrom) };
  } else if (startDateTo) {
    filters.startDate = { [Op.lte]: new Date(startDateTo) };
  }
  if (createdFrom && createdTo) {
    filters.createdAt = {
      [Op.between]: [new Date(createdFrom), new Date(createdTo)],
    };
  } else if (createdFrom) {
    filters.createdAt = { [Op.gte]: new Date(createdFrom) };
  } else if (createdTo) {
    filters.createdAt = { [Op.lte]: new Date(createdTo) };
  }

  try {
    const transactions = await paginate(Transaction, req, {
      searchable: ["investmentGoal"],
      order: [["createdAt", "DESC"]],
      where: type ?
        type === 'withdraw' ?
          { ...filters, type, isWithdrawalRequest: true, isPayout: false } :
          type === 'payout' ? { ...filters, isPayout: true, isWithdrawalRequest: true } :
            { ...filters, type } : filters,
      include: [
        {
          model: Investors,
          attributes: ["name", "email"],
        },
        {
          model: Plan,
          attributes: ["name", "roi"],
        },
      ],
    });
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      include: [
        {
          model: Investors,
          attributes: { exclude: ['password'] }
        },
        {
          model: Plan,
        },
      ],
    });

    if (!transaction) {
      return parseError(404, "Transaction not found", next);
    }

    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
};

export const reviewTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return parseError(404, "Transaction not found", next);
    }
    const investor = await Investors.findByPk(transaction.investorId);
    const { status } = req.body;
    if (status === 'rejected') {
      const { reason } = req.body;
      if (!reason) return parseError(400, "Reason for rejection is required", next);
      await transaction.update({ reason, status });
      await Investment.update({ status: 'cancelled' }, { where: { id: transaction.investmentId } });
      await sendMail({
        fields: {
          name: investor?.dataValues?.name || '',
          reason,
          transactionId: transaction?.transactionId, email: investor.email,
          supportLink: `${process.env.SUPPORT_REDIRECT_URL}`,
          dashboardLink: `${process.env.DASHBOARD_REDIRECT_URL}/login?action=view-transactions`,
        },
        subject: "Transaction Rejected - 2Zero Investment",
        template: transactionRejectedEmailTemplate
      });
    }
    else {
      const investment = await Investment.findOne({ where: { id: transaction.investmentId } });
      if (transaction?.type === 'deposit') {
        await transaction.update({ status });
        await investment.update({ status: 'active' });
        await sendMail({
          fields: {
            name: investor?.dataValues?.name || '',
            transactionId: transaction?.transactionId, email: investor.email,
            dashboardLink: `${process.env.DASHBOARD_REDIRECT_URL}/login?action=view-transactions`
          },
          subject: "Transaction Approved - 2Zero Investment",
          template: transactionApprovedEmailTemplate
        });
        res.status(200).json({ success: true, data: transaction });
      }
      if (transaction?.type === 'withdraw') {
        const profile = await Profile.findOne({ where: { investorId: transaction.investorId } });
        const plan = await Plan.findOne({ where: { id: transaction.planId } });
        if (!plan) {
          return parseError(404, "Investment plan not found", next);
        }
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


        if (!isTimelineCompleted()) {
          return parseError(400, "Withdrawal is only allowed after one year from the plan start date", next);
        }
        const investorKycRequest = await InvestorKycRequest.findOne({ where: { investorId: transaction.investorId } });
        if (!investorKycRequest || investorKycRequest.status !== 'approved') {
          return parseError(403, "Investor KYC verification is required before processing withdrawal", next);
        }
        if (!profile.stripeAccountId) {
          return parseError(403, "Investor must have a Stripe Connect account to process withdrawal", next);
        }

        const averageRoi = () => {
          const [min, max] = plan?.roi
            ?.replace("%", "")
            .split("-")
            .map(Number);
          const avgRoi = (min + max) / 2;
          return Number(avgRoi.toFixed(2));
        }

        const withdrawalAmount =
          parseFloat(investment?.amount) +
          ((parseFloat(investment?.amount) * averageRoi()) / 100);

        try {
          //check if account exists
          const account = await stripe.accounts.retrieve(profile.stripeAccountId);
          if (!account) {
            return parseError(404, "Account not found.", next);
          }
          if (account.capabilities.transfers !== 'active') {
            const accountLink = await stripe.accountLinks.create({
              account: profile.stripeAccountId,
              refresh_url: `${process.env.STRIPE_REFRESH_URL}?investorId=${transaction.investorId}&investmentId=${transaction.investmentId}`,
              return_url: `${process.env.STRIPE_RETURN_URL}?investorId=${transaction.investorId}&investmentId=${transaction.investmentId}`,
              type: "account_onboarding",
            });
            await sendMail({
              fields: {
                name: investor?.dataValues?.name || '',
                onboardingLink: accountLink.url,
                //supportLink: "http://localhost:7000/investor/contact-support",
                email: investor.email
              },
              subject: "Complete Your Investor Onboarding - 2Zero Investment",
              template: investorOnboardingEmailTemplate
            });
            await investment.update({ onboardingLink: accountLink.url });
            await profile.update({ accountStatus: 'pending' });
          }
          if (account.capabilities.transfers === 'active') {
            profile.update({ accountStatus: 'active' });
          }
          //pay customer to stripe connect account
          // const transfer = await stripe.transfers.create({
          //   amount: 100 /*withdrawalAmount * 100 */,
          //   currency: "usd",
          //   destination: profile.stripeAccountId,
          // });

          //console.log("Transfer successful:", transfer.id);

          await transaction.update({ status, isPayout: true });
          await investment.update({ status: 'completed' });
          return res.status(200).json({ success: true, data: transaction, message: "Withdrawal request approved successfully" });
        } catch (stripeError) {
          console.log(stripeError);
          return parseError(500, "Failed to credit Stripe Connect account" + stripeError, next);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

export const processPayout = async (req, res, next) => {
  const transaction = await Transaction.findByPk(req.params.id);
  if (!transaction) {
    return parseError(404, "Transaction not found", next);
  }
  if (transaction.status !== 'approved') {
    return parseError(400, "Transaction is not approved", next);
  }
  if (!transaction.isPayout) {
    return parseError(400, "Transaction is not ready for payout", next);
  }
  const investor = await Investors.findByPk(transaction.investorId);
  const investment = await Investment.findByPk(transaction.investmentId);
  const plan = await Plan.findByPk(transaction.planId);
  const profile = await Profile.findOne({ where: { investorId: transaction.investorId } });
  if (!investor) {
    return parseError(404, "Investor not found", next);
  }
  if (!investment) {
    return parseError(404, "Investment not found", next);
  }
  if (transaction.investmentId !== investment.id) {
    return parseError(400, "Transaction does not belong to this investment", next);
  }
  if (investment.investorId !== transaction.investorId) {
    return parseError(400, "Transaction does not belong to this investor", next);
  }
  if (!plan) {
    return parseError(404, "Plan not found", next);
  }
  if (!profile) {
    return parseError(404, "Profile not found", next);
  }
  if (profile.accountStatus !== 'active') {
    return parseError(400, "Profile is not active", next);
  }
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
  if (!isTimelineCompleted()) {
    return parseError(400, "Withdrawal is only allowed after one year from the plan start date", next);
  }
  const investorKycRequest = await InvestorKycRequest.findOne({ where: { investorId: transaction.investorId } });
  if (!investorKycRequest || investorKycRequest.status !== 'approved') {
    return parseError(403, "Investor KYC verification is required before processing payout", next);
  }
  if (!profile.stripeAccountId) {
    return parseError(403, "Investor must have a Stripe Connect account to process payout", next);
  }
  const averageRoi = () => {
    const [min, max] = plan?.roi
      ?.replace("%", "")
      .split("-")
      .map(Number);
    const avgRoi = (min + max) / 2;
    return Number(avgRoi.toFixed(2));
  }
  const withdrawalAmount =
    parseFloat(investment?.amount) +
    ((parseFloat(investment?.amount) * averageRoi()) / 100);
  try {
    //check if account exists
    const account = await stripe.accounts.retrieve(profile.stripeAccountId);
    if (!account) {
      return parseError(404, "Account not found.", next);
    }
    if (account.capabilities.transfers !== 'active') {
      return parseError(403, "Investor must have a Stripe Active Connect account to process payout", next);
    }
    if (transaction.payoutStatus === 'success') {
      return parseError(400, "Transaction has already been paid", next);
    }
    const transfer = await stripe.transfers.create({
      amount: withdrawalAmount * 100,
      currency: "usd",
      destination: profile.stripeAccountId,
    });
    console.log("Transfer successful:", transfer.id);
    await transaction.update({ payoutStatus: 'success', isPayout: true });
    await investment.update({ status: 'completed', paymentStatus: 'paid' });
    return res.status(200).json({ success: true, data: transaction, message: `Investment payout with transfer id ${transfer.id} processed successfully` });
  } catch (stripeError) {
    console.log(stripeError);
    await transaction.update({ payoutStatus: 'failed' });
    return parseError(500, "Failed to credit Stripe Connect account" + stripeError, next);
  }
}

export const verifyInvestorAccount = async (req, res, next) => {
  try {
    const investmentId = req.params.investmentId
    const investorId = req.params.investorId
    const investment = await Investment.findOne({ where: { id: investmentId } });
    const profile = await Profile.findOne({ where: { investorId: investorId } });
    //accountStatus
    if (!investment) {
      return parseError(404, "Investment not found", next);
    }
    if (!profile) {
      return parseError(404, "Profile not found", next);
    }

    const account = await stripe.accounts.retrieve(profile.stripeAccountId);
    if (!account) {
      return parseError(404, "Account not found.", next);
    }
    if (account.capabilities.transfers === 'active') {
      await profile.update({ accountStatus: 'active' });
    }
    await investment.update({ paymentStatus: 'pending' });
    return res.status(200).json({ success: true, message: "Investor account verified successfully" });
  } catch (error) {
    next(error);
  }
}

export const getLoginLink = async (req, res, next) => {
  try {
    const investmentId = req.params.investmentId
    const investorId = req.params.investorId
    const investment = await Investment.findOne({ where: { id: investmentId } });
    const profile = await Profile.findOne({ where: { investorId: investorId } });
    //accountStatus
    if (!investment) {
      return parseError(404, "Investment not found", next);
    }
    if (!profile?.stripeAccountId) {
      return parseError(404, "Account profile not found", next);
    }
    const account = await stripe.accounts.retrieve(profile.stripeAccountId);
    if (!account) {
      return parseError(404, "Account not found.", next);
    }
    if (account.capabilities.transfers !== 'active') {
      parseError(403, "Account is not active", next);
    }
    const loginLink = await stripe.accounts.createLoginLink(profile.stripeAccountId);

    return res.status(200).json({ success: true, url: loginLink?.url, message: "Investor login link generated successfully" });
  } catch (error) {
    next(error);
  }
}

//export const 
export const getTransactionSummary = async (req, res, next) => {
  try {
    const [totalTransactions, approved, pending, rejected, withdrawalRequest,
      payoutCount
    ] = await Promise.all(
      req.params.id ?
        [Transaction.count({ where: { investorId: req.params.id } }),
        Transaction.count({ where: { investorId: req.params.id, status: "approved" } }),
        Transaction.count({ where: { investorId: req.params.id, status: "pending" } }),
        Transaction.count({ where: { investorId: req.params.id, status: "rejected" } })]
        :
        [Transaction.count(),
        Transaction.count({ where: { status: "approved" } }),
        Transaction.count({ where: { status: "pending" } }),
        Transaction.count({ where: { status: "rejected" } }),
        Transaction.count({ where: { isWithdrawalRequest: true, type: "withdraw", isPayout: false } }),
        Transaction.count({ where: { isWithdrawalRequest: true, type: "withdraw", isPayout: true } }),
        ]
    );
    if (req.params.id) {
      return res.status(200).json({
        totalTransactions,
        approved,
        pending,
        rejected,
      });
    }
    res.status(200).json({
      totalTransactions,
      approved,
      pending,
      rejected,
      withdrawalRequest,
      payoutCount
    });
  } catch (error) {
    next(error);
  }
};