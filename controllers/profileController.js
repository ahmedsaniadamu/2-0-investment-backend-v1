import { db } from "../models/index.js";
import bcrypt from 'bcrypt';
import { parseError } from "../helpers/parseError.js";
import stripe from '../config/stripe.js';

const { Profile, Investors, InvestorKycRequest } = db;

export const getProfile = async (req, res, next) => {
  try {
    const result = await Profile.findOne({
      where: { investorId: req.params.id },
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
    if (!result) {
      let profile = await Investors.findOne({ where: { id: req.params.id } });
      res.status(200).json({ message: "Default profile retrieved", investor: profile });
    }
    else res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const checkProfileExists = async (req, res, next) => {
  try {
    const result = await Profile.findOne({ where: { investorId: req.params.id } });
    if (!result) {
      res.status(200).json({ exists: false });
    }
    else res.status(200).json({ exists: true });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    if (!req.params.id) return parseError(400, "investorId is required", next);

    const _profile = await Profile.findOne({ where: { investorId: req.params.id } });
    const investor = await Investors.findByPk(req.params.id);

    let stripeAccountId = _profile?.stripeAccountId;

    if (!stripeAccountId && investor) {
      try {
        const account = await stripe.accounts.create({
          type: "express",
          email: investor.email,
          country: investor.country || "US",
          capabilities: {
            transfers: { requested: true },
          },
        });
        stripeAccountId = account.id;
      } catch (err) {
        console.error('Stripe Connect creation failed:', err.message);
      }
    }

    if (!_profile) {
      const createData = { ...req.body, investorId: req.params.id };
      if (stripeAccountId) createData.stripeAccountId = stripeAccountId;

      const profile = await Profile.create(createData);
      res.status(200).json({ message: "Profile created successfully", profile });
    }
    else {
      const updateData = { ...req.body };
      if (stripeAccountId && !_profile.stripeAccountId) {
        updateData.stripeAccountId = stripeAccountId;
      }

      await Profile.update(updateData, {
        where: { investorId: req.params.id }
      });
      res.status(200).json({ message: "Profile updated successfully", profile: updateData });
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