import { paginate } from "../helpers/pagination.js";
import { db } from "../models/index.js";
import { parseError } from "../helpers/parseError.js";

const {Plan} = db;

export const createPlan = async (req, res, next) => {
  try {
    const { name, description, minDeposit, maxDeposit, roi } = req.body;
    if(!name || !description || !minDeposit || !maxDeposit || !roi) return parseError(400, "All fields are required", next);
    
    const isExist = await Plan.findOne({ where: { name } });
    if (isExist) return parseError(400, "Plan already exists", next);
    
    const plan = await Plan.create({ name, description, minDeposit, maxDeposit, roi });
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    next(error);
  }
};

export const getPlans = async (req, res, next) => {
  try {
    const result = await paginate(Plan, req, {
      searchable: ["name", "description"], 
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getPlanById = async (req, res, next) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) return parseError(404, "Plan not found", next);
    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    next(error);
  }
};

export const updatePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if(!req.body.name || !req.body.description || !req.body.minDeposit || !req.body.maxDeposit || !req.body.roi) return parseError(400, "All fields are required", next);
    
    if (!plan) return parseError(404, "Plan not found", next);

    await plan.update(req.body);
    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    next(error);
  }
};

export const deletePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) return parseError(404, "Plan not found", next);

    await plan.destroy();
    res.status(200).json({ success: true, message: "Plan deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getPlanInvestments = async (req, res, next) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) return parseError(404, "Plan not found", next);
    
    const investments = await plan.getInvestments();
    res.status(200).json({ success: true, data: investments });
  } catch (error) {
    next(error);
  }
};