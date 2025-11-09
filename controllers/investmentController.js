import { paginate } from "../helpers/pagination.js";
import { db } from "../models/index.js";
import { sendMail } from "../services/authService.js";
import { transactionPendingEmailTemplate } from "../templates/transaction-status-template.js";
import { parseError } from "../helpers/parseError.js";

const { Investment, Transaction, Investors } = db;

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
                 transactionId: transaction?.id, email: investor.email 
                },
           subject: "Transaction Review Status - 2-0 Investment",
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
        });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getInvestorInvestments = async (req, res, next) => {
    try {
        const investments = await paginate(Investment, req, {
            where: { investorId: req.params.id },
             attributes: { exclude: ['investorId', 'updatedAt', 'reason'] }
        });
        if(!investments) return parseError(404, "Investments not found", next);
        res.status(200).json(investments);
    } catch (error) {
        next(error);
    }
};