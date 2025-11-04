import { paginate } from "../helpers/pagination.js";
import { db } from "../models/index.js";

const { Investment} = db;

export const createInvestment = async (req, res) => {
    try {
        const newInvestment = await Investment.create(req.body);
        res.status(201).json({ success: true, data: newInvestment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getInvestments = async (req, res) => {
    try {
        const result = await paginate(Investment, req, {
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getInvestorInvestments = async (req, res) => {
    try {
        const investments = await Investment.findAll({ 
            where: { investorId: req.params.id },
           attributes: { exclude: ['investorId', 'updatedAt'] }
        });
        if(!investments) return res.status(404).json({ message: "Investments not found" });
        res.status(200).json(investments);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};