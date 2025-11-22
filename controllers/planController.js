import { paginate } from "../helpers/pagination.js";
import { db } from "../models/index.js";
import { parseError } from "../helpers/parseError.js";
import { cast, col, fn, literal } from "sequelize";

const {Plan, Investment} = db;

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
    const result = await Plan.findAll({
      searchable: ["name", "description"], 
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ['visibility'],
        include: [
          [ cast( fn("COUNT", col("planId")), "INTEGER"),
            "investmentCount"
          ]
        ]
      },
      where: { visibility: true },
      include: [
        {
          model: Investment, as: "investments",
          attributes: [],  
        }
      ],
      group: ["Plan.id"],  
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// export const getPlansAdmin = async (req, res, next) => {
//   try {
//     const result = await paginate(Plan, req, {
//       searchable: ["name", "description"], 
//       order: [["createdAt", "DESC"]],
//       attributes: { exclude: ['index'],  include: [
//        [ 
//         literal(`(
//           SELECT COUNT(*)::INTEGER FROM "Investments" AS
//            investments WHERE investments."planId" = "Plan"."id")`),
//         "investmentsCount"
//        ]
//       ]},
//     });

//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
export const getPlansAdmin = async (req, res, next) => {
  try {
    const plansPage = await paginate(Plan, req, {
      searchable: ["name", "description"],
      order: [["createdAt", "DESC"]],
    });

    const planIds = plansPage.data.map((p) => p.id);

    let countsByPlan = {};
    if (planIds.length) {
      const counts = await Investment.findAll({
        attributes: ["planId", [fn("COUNT", col("id")), "cnt"]],
        where: { planId: planIds },
        group: ["planId"],
        raw: true,
      });

      countsByPlan = counts.reduce((acc, row) => {
        acc[row.planId] = Number(row.cnt);
        return acc;
      }, {});
    }

    const rows = plansPage.data.map((plan) => ({
      ...plan.toJSON(),
      investmentsCount: countsByPlan[plan.id] ?? 0,
    }));

    res.status(200).json({ ...plansPage, data: rows });
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
    if( typeof req.body.visibility !== "boolean") return parseError(400, "Plan visibility is required", next);
    
    if (!plan) return parseError(404, "Plan not found", next);

    await plan.update({ visibility: req.body.visibility });
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
    
    const investments = await paginate(Investment, req, {
      where: { planId: req.params.id },
      searchable: ["investmentGoal", 'paymentMethod'],
      attributes: { exclude: ['investorId', 'agreement', 'index'] },
    });
   let investment = {...investments, data: investments.data.map((i) => {
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
             return {...JSON.parse(JSON.stringify(i)), status: updateInvestmentStatus(i)}
        } )};
        res.status(200).json(investment);
  } catch (error) {
    next(error);
  }
};