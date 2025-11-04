import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../models/index.js";
import otpGenerator from "otp-generator";
import { sendMail } from "../services/authService.js";
import { forgotPasswordEmailTemplate, resendOtpEmailTemplate } from "../templates/registration-template.js";

dotenv.config();

const { Investors, InvestorOtps } = db;

export const verifyOtp = async (req, res) => {
  try{
    const { investorId, otp, type } = req.body;
    const user = await Investors.findOne({ where: { id: investorId } });
    if (!user) return res.status(400).json({ message: 'Investor not found' });
    const investorOtp = await InvestorOtps.findOne({ where: { investorId: user?.id, otp } });
    if (!investorOtp) return res.status(400).json({ message: 'Invalid OTP' });
    if (investorOtp?.dataValues?.expiresAt < Date.now()) return res.status(400).json({ message: 'OTP expired' });
    //update verification status
    user.isVerified = true;
    await user.save();
    //Delete or invalidate the OTP after successful verification
    await investorOtp.destroy();
    const token = jwt.sign({ id: user?.dataValues?.id, email: user?.dataValues?.email, role: user?.dataValues?.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const data = type === 'signup' || type === 'login' ? {token,
      user: { 
            id: user.id, name: user.name, 
            email: user.email, role: user.role
        },} : {}
    return res.status(200).json({ 
      ...data,
      message: 'OTP verified successfully'
     });
  }catch(error){
    return res.status(500).json({ message: error.message });
  }
}

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    // Check if investor exists
    const investor = await Investors.findOne({ where: { email } });
    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }
    // Generate new OTP
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    // Delete old OTPs for this investor 
    await InvestorOtps.destroy({ where: { investorId: investor.id } });
    // Save new OTP
    await InvestorOtps.create({ investorId: investor.id, otp, expiresAt });
    // Send OTP email
    await sendMail({email, user: investor, otp, subject:"Your New OTP Code",
      template: resendOtpEmailTemplate
    });
    res.status(200).json({ message: `A new OTP has been sent to ${email}` });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Failed to resend OTP", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const investor = await Investors.findOne({ where: { email } });
    if (!investor) return res.status(404).json({ message: "Investor not found" });
    // if(!investor.isVerified) return res.status(400).json({ 
    //   message: "Investor is not verified. verify your account to initiate password reset"
    //  });
    // Generate OTP
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    // Delete old OTPs for this investor
    await InvestorOtps.destroy({ where: { investorId: investor.id } });
    // Save new OTP
    await InvestorOtps.create({ investorId: investor.id, otp, expiresAt });
    // Send email
    await sendMail({
      email,
      otp,
      user: investor,
      subject: "Reset your password - 2-0 Investment",
      template: forgotPasswordEmailTemplate
    });
    return res.status(200).json({
      user: { id: investor.id, email: investor.email },
      message: `A password reset OTP has been sent to ${email}`,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Failed to send reset OTP", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {

    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res.status(400).json({ message: "Email, and new password are required" });
    const investor = await Investors.findOne({ where: { email } });
    if (!investor) return res.status(404).json({ message: "Investor not found" });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    investor.password = hashedPassword;
    await investor.save();
    const token = jwt.sign({ id: investor?.dataValues?.id, email: investor?.dataValues?.email, role: investor?.dataValues?.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ 
      message: "Password has been reset successfully",
      token,
      user: { 
            id: investor.id, name: investor.name, 
            email: investor.email, role: investor.role
        }
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to reset password", error: error.message });
  }
};

export const signup = async (req, res) => {
    try{
       const {  name, email, password, role, phone_number } = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);
       const isExist = await Investors.findOne({ where: { email } });
     if (isExist) return res.status(400).json({ message: 'Investor already exists' });
       const user = await Investors.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone_number: phone_number,
        });

    // Generate OTP
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    // Save OTP
    await InvestorOtps.create({ investorId: user?.dataValues?.id, otp, expiresAt });
    // Send OTP via Gmail
    await sendMail({email, otp, user});
    const {id, ...investor} = user?.dataValues
     res.status(201).json({ 
        message: `Investor account created successfully 
        and OTP sent to ${email} for verification`, 
        user: {...investor, id: id} 
    });
    } catch(error){
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try{
      const { email, password } = req.body;
      const user = await Investors.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Investor not found' });
     const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid password' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
     res.json({ 
        message: 'Login successful', 
        token, 
        user: { 
            id: user.id, name: user.name, 
            email: user.email, role: user.role,
            isVerified: user.isVerified
        } });
    } catch(error){
        res.status(400).json({ error: error.message });
    }
}