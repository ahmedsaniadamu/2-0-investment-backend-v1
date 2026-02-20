import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../models/index.js";
import otpGenerator from "otp-generator";
import { sendMail } from "../services/authService.js";
import { forgotPasswordEmailTemplate, registrationEmailTemplate, resendOtpEmailTemplate } from "../templates/registration-template.js";
import { parseError } from "../helpers/parseError.js";

dotenv.config();

const { Investors, InvestorOtps, Permission, Profile } = db;

export const verifyOtp = async (req, res, next) => {
  try {
    const { investorId, otp, type } = req.body;
    const user = await Investors.findOne({
      where: { id: investorId },
      include: [
        {
          model: Profile,
          as: "profile",
        },
        {
          model: Permission,
          as: "permissions",
          attributes: ["name", "module"],
          through: { attributes: [] },
        }
      ]
    });
    if (!user) return parseError(404, 'Investor not found', next);
    const investorOtp = await InvestorOtps.findOne({ where: { investorId: user?.id, otp } });
    if (!investorOtp) return parseError(400, 'Invalid OTP', next);
    if (investorOtp?.dataValues?.expiresAt < Date.now()) return parseError(400, 'OTP expired', next);

    user.isVerified = true;
    await user.save();

    await investorOtp.destroy();
    const token = jwt.sign({
      id: user?.dataValues?.id, email: user?.dataValues?.email,
      role: user?.dataValues?.role
    }, process.env.JWT_SECRET,
      { expiresIn: '1h' });
    const data = type === 'signup' || type === 'login' ? {
      token,
      user: {
        id: user.id, name: user.name,
        email: user.email, role: user.role,
        phone_number: user.phone_number,
        userType: user.userType,
        isVerified: user.isVerified,
        permissions: user.permissions,
        profile: user.profile,
      },
    } : {}
    return res.status(200).json({
      ...data,
      message: 'OTP verified successfully'
    });
  } catch (error) {
    next(error);
  }
}

export const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return parseError(400, 'Email is required', next);
    }

    const investor = await Investors.findOne({ where: { email } });
    if (!investor) {
      return parseError(404, 'Investor not found', next);
    }

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await InvestorOtps.destroy({ where: { investorId: investor.id } });

    await InvestorOtps.create({ investorId: investor.id, otp, expiresAt });

    await sendMail({
      email, user: investor, otp, subject: "Your New OTP Code",
      template: resendOtpEmailTemplate
    });
    res.status(200).json({ message: `A new OTP has been sent to ${email}` });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return parseError(400, "Email is required", next);

    const investor = await Investors.findOne({ where: { email } });
    if (!investor) return parseError(404, "Investor not found", next);

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await InvestorOtps.destroy({ where: { investorId: investor.id } });

    await InvestorOtps.create({ investorId: investor.id, otp, expiresAt });

    await sendMail({
      email,
      otp,
      user: investor,
      subject: "Reset your password - 2Zero Investment",
      template: forgotPasswordEmailTemplate
    });
    return res.status(200).json({
      user: { id: investor.id, email: investor.email },
      message: `A password reset OTP has been sent to ${email}`,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return parseError(400, "Email and new password are required", next);

    const investor = await Investors.findOne({
      where: { email },
      include: [
        {
          model: Profile,
          as: "profile",
        },
        {
          model: Permission,
          as: "permissions",
          attributes: ["name", "module"],
          through: { attributes: [] },
        }
      ]
    });
    if (!investor) return parseError(404, "Investor not found", next);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    investor.password = hashedPassword;
    await investor.save();

    const token = jwt.sign({ id: investor?.dataValues?.id, email: investor?.dataValues?.email, role: investor?.dataValues?.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({
      message: "Password has been reset successfully",
      token,
      user: {
        id: investor.id, name: investor.name,
        email: investor.email, role: investor.role,
        phone_number: investor.phone_number,
        userType: investor.userType,
        isVerified: investor.isVerified,
        permissions: investor.permissions,
        profile: investor.profile,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role, phone_number } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isExist = await Investors.findOne({ where: { email } });
    if (isExist) return parseError(400, 'Investor already exists', next);

    const user = await Investors.create({
      name,
      email,
      password: hashedPassword,
      role: 'investor',
      phone_number: phone_number,
    });

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await InvestorOtps.create({ investorId: user?.dataValues?.id, otp, expiresAt });

    await sendMail({ email, otp, user, template: registrationEmailTemplate });
    const { id, ...investor } = user?.dataValues
    res.status(201).json({
      message: `Investor account created successfully and OTP sent to ${email} for verification`,
      user: { ...investor, id: id }
    });
  } catch (error) {
    next(error);
  }
};

// export const login = async (req, res, next) => {
//     try{
//       const { email, password } = req.body;
//       const user = await Investors.findOne({ where: { email } });
//     if (!user) return parseError(404, 'Invalid email, please sign up if you don\'t have an account', next);

//      const valid = await bcrypt.compare(password, user.password);
//     if (!valid) return parseError(400, 'Invalid password', next);

//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//      res.json({ 
//         message: 'Login successful', 
//         token, 
//         user: { 
//             id: user.id, name: user.name, 
//             email: user.email, role: user.role,
//             isVerified: user.isVerified
//         } });
//     } catch(error){
//         next(error);
//     }
// }

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Investors.findOne({
      where: { email },
      include: [
        {
          model: Permission,
          as: "permissions",
          attributes: ["name", "module"],
          through: { attributes: [] },
        },
        {
          model: Profile,
          as: "profile",
        },
      ],
    });
    if (!user) {
      return parseError(
        404,
        "Invalid email, please sign up if you don't have an account",
        next
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return parseError(400, "Invalid password", next);
    }

    const permissions = user.permissions.map(p => p.name);

    const token = jwt.sign(
      {
        id: user.id,
        userType: user.userType,
        permissions,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone_number: user.phone_number,
        userType: user.userType,
        isVerified: user.isVerified,
        permissions: user.permissions,
        profile: user.profile,
      },
    });
  } catch (error) {
    next(error);
  }
};
