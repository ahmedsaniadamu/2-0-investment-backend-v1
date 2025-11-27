import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import mjml2html from "mjml";
import Handlebars from 'handlebars';
import { registrationEmailTemplate } from "../templates/registration-template.js";
import dotenv from "dotenv";

dotenv.config();

export const sendMail = async ({
  email, user, otp, subject, template, name, 
  fields= null,
}) => {
    //   const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.GMAIL_USER,
    //     pass: process.env.GMAIL_PASS,
    //   },
    // });
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        }
      });
   
    const template_ = Handlebars.compile(template || registrationEmailTemplate);
    const rawTemplate =  template_(fields || { 
      name: user?.dataValues?.name || name || '', otp
     });
    const { html, errors } = mjml2html(rawTemplate);

    await transporter.sendMail({
      from: `"2-0 Investment" <${process.env.GMAIL_USER}>`,
      to: email || fields?.email,
      subject: subject || "Verify your email with OTP",
      html:html,
    });
}