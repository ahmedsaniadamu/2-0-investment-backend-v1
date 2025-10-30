import { paginate } from "../helpers/pagination.js";
import { db } from "../models/index.js";

const {Plan} = db;

export const createPlan = async (req, res) => {
  try {
    const { name, description, minDeposit, maxDeposit, roi } = req.body;
    if(!name || !description || !minDeposit || !maxDeposit || !roi) return res.status(400)
        .json({ success: false, message: "All fields are required" });
    const isExist = await Plan.findOne({ where: { name } });
    if (isExist) return res.status(400).json({ success: false, message: "Plan already exists" });
    const plan = await Plan.create({ name, description, minDeposit, maxDeposit, roi });
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPlans = async (req, res) => {
  try {
    const result = await paginate(Plan, req, {
      searchable: ["name", "description"], 
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });
    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if(!req.body.name || !req.body.description || !req.body.minDeposit || !req.body.maxDeposit || !req.body.roi) return res.status(400)
        .json({ success: false, message: "All fields are required" });
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

    await plan.update(req.body);
    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

    await plan.destroy();
    res.status(200).json({ success: true, message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
