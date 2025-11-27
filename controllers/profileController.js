import { db } from "../models/index.js";
import bcrypt from 'bcrypt';
import { parseError } from "../helpers/parseError.js";

const {Profile, Investors, InvestorKycRequest} = db;

export const getProfile = async (req, res, next) => {
    try {
        const result = await Profile.findOne({
            where: {investorId: req.params.id},
            attributes: {
              exclude: ['kycStatus']
            },
            include: [
                {
                  model: Investors,
                  as: "investor",
                  attributes: { exclude: ['password'] }
                },
                {
                  model: InvestorKycRequest,
                  as: "investorKycRequest",
                  attributes: { exclude: ['createdAt', 'updatedAt', 'investorId'] }
                }
            ],
        });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        if(!req.params.id) return parseError(400, "investorId is required", next);
        
        const _profile = await Profile.findOne({where: {investorId: req.params.id}});
        if(!_profile){
           const profile = await Profile.create(req.body);
            res.status(200).json({message: "Profile created successfully", profile});
        }
        else {
            const profile = await Profile.update(req.body, {
            where: {investorId: req.params.id}
           });
          res.status(200).json({message: "Profile updated successfully", profile: req.body});
        }
        
    } catch (error) {
        next(error);
    }
}

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const investorId = req.params.id;

    if (!investorId) {
      return parseError(400, "Investor ID is required", next);
    }

    if (!currentPassword || !newPassword) {
      return parseError(400, "Both current and new passwords are required", next);
    }

    const investor = await Investors.findByPk(investorId);

    if (!investor) {
      return parseError(404, "Investor not found", next);
    }

    const isMatch = await bcrypt.compare(currentPassword, investor.password);

    if (!isMatch) {
      return parseError(400, "Current password is incorrect", next);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await investor.update({ password: hashedPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};