import { db } from "../models/index.js";
import { parseError } from "../helpers/parseError.js";
import { calculateInvestorProfit } from "../helpers/calculateInvestorProfit.js";
import { Op } from "sequelize";

const { Investment, Transaction, Plan } = db;

export const getInvestorSummary = async (req, res, next) => {
  try {
    const { investorId } = req.params;
    if (!investorId) return parseError(400, "Investor ID is required", next);

    const totalInvestment = await Investment.sum("amount", {
      where: { investorId },
    });

    const investorPlans = await Investment.findAll({
      attributes: ["planId", "amount", "startDate"],
      where: { investorId },
      include: [{ model: Plan, attributes: ["name", "roi"], as: "plan" }],
    })
    const profit = calculateInvestorProfit(investorPlans)
    
    const activePlans = await Investment.count({
      distinct: true,
      col: "planId",
      where: { investorId, },
    });

    const totalTransactions = await Transaction.count({
      where: { investorId },
    });

    res.status(200).json({
      success: true,
      data: {
        totalInvestment: totalInvestment || 0,
        totalProfit: profit || 0,
        activePlans: activePlans || 0,
        totalTransactions: totalTransactions || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getInvestorProfitGrowth = async (req, res, next) => {
  try {
    const { investorId } = req.params;
    if (!investorId) return parseError(400, "Investor ID is required", next);

    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 5);

    const investments = await Investment.findAll({
      where: { investorId, startDate: { [Op.lte]: currentDate } },
      include: [{ model: Plan, as: "plan", attributes: ["roi", "name"] }],
    });

    if (!investments.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No investment records found for this investor",
      });
    }

    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const month = new Date();
      month.setMonth(currentDate.getMonth() - i);
      const monthName = month.toLocaleString("default", { month: "short" });

      // Only calculate profit if investment existed before this month
      const activeInvestments = investments.filter(
        (inv) => new Date(inv.startDate) <= month
      );

      const monthlyProfit = activeInvestments.length
        ? calculateInvestorProfit(activeInvestments, month)
        : 0;

      monthlyData.push({
        month: monthName,
        profit: monthlyProfit,
      });
    }

    res.status(200).json({
      success: true,
      data: monthlyData,
    });

  } catch (error) {
    next(error);
  }
};

export const getInvestmentVsProfit = async (req, res, next) => {
  try {
    const { investorId } = req.params;
    if (!investorId) return parseError(400, "Investor ID is required", next);
    const investments = await Investment.findAll({
      where: { investorId },
      include: [{ model: Plan, attributes: ["id", "name", "roi"], as: "plan" }],
    });

    if (!investments.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No investment data found",
      });
    }
    const grouped = {};
    investments.forEach((inv) => {
      const planName = inv.plan?.name || "Unknown";
      if (!grouped[planName]) grouped[planName] = [];
      grouped[planName].push(inv);
    });
    const result = Object.keys(grouped).map((planName) => {
      const planInvestments = grouped[planName];

      const totalInvestment = planInvestments.reduce(
        (sum, inv) => sum + parseFloat(inv.amount || 0),
        0
      );
      const totalProfit = calculateInvestorProfit(planInvestments);
      return {
        planName,
        totalInvestment: Number(totalInvestment.toFixed(2)),
        totalProfit: Number(totalProfit),
      };
    });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//shows how the investor’s investments are distributed across plans
export const getPortfolioAllocation = async (req, res, next) => {
  try {
    const { investorId } = req.params;
    if (!investorId) return parseError(400, "Investor ID is required", next);

    const investments = await Investment.findAll({
      where: { investorId },
      include: [{ model: Plan, attributes: ["name"], as: "plan" }],
    });

    if (!investments.length)
      return res.status(200).json({
        success: true,
        data: [],
        message: "No investments yet for this investor",
      });
    // Sum by plan
    const total = investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
    const allocation = {};

    investments.forEach((inv) => {
      const planName = inv.plan?.name || "Unknown";
      allocation[planName] = (allocation[planName] || 0) + parseFloat(inv.amount);
    });
    // Convert to percentage
    const result = Object.entries(allocation).map(([planName, amount]) => ({
      planName,
      percentage: ((amount / total) * 100).toFixed(2),
    }));

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};