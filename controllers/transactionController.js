import { paginate } from "../helpers/pagination.js";
import { db } from "../models/index.js";
import { Op } from "sequelize";
import { sendMail } from "../services/authService.js";
import { transactionApprovedEmailTemplate, transactionRejectedEmailTemplate } from "../templates/transaction-status-template.js";
import { parseError } from "../helpers/parseError.js";

const { Transaction, Plan, Investors, Investment } = db;

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
  const { status, paymentMethod, startDateFrom, startDateTo, createdFrom, createdTo } = req.query;
  const type = req.query.type || ''
  const filters = {};
  if (status) {
    filters.status = status;
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
      where: type ? type === 'withdraw' ? { ...filters, type, isWithdrawalRequest: true } : { ...filters, type } : filters,
      include: [
        {
          model: Investors,
          attributes: ["name", "email"],
        },
        {
          model: Plan,
          attributes: ["name"],
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
          transactionId: transaction?.id, email: investor.email
        },
        subject: "Transaction Rejected - 2Zero Investment",
        template: transactionRejectedEmailTemplate
      });
    }
    else {
      await transaction.update({ status });
      await Investment.update({ status: 'active' }, { where: { id: transaction.investmentId } });
      await sendMail({
        fields: {
          name: investor?.dataValues?.name || '',
          transactionId: transaction?.id, email: investor.email
        },
        subject: "Transaction Approved - 2Zero Investment",
        template: transactionApprovedEmailTemplate
      });
    }

    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
};

export const getTransactionSummary = async (req, res, next) => {
  try {
    const [totalTransactions, approved, pending, rejected, withdrawalRequest] = await Promise.all(
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
        Transaction.count({ where: { isWithdrawalRequest: true, type: "withdraw" } }),
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
      withdrawalRequest
    });
  } catch (error) {
    next(error);
  }
};