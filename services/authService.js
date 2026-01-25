// import nodemailer from "nodemailer";
// import otpGenerator from "otp-generator";
// import mjml2html from "mjml";
// import Handlebars from 'handlebars';
// import { registrationEmailTemplate } from "../templates/registration-template.js";
// import dotenv from "dotenv";

// dotenv.config();

// export const sendMail = async ({
//   email, user, otp, subject, template, name, 
//   fields= null,
// }) => {
//       const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, 
//         auth: {
//           user: process.env.GMAIL_USER,
//           pass: process.env.GMAIL_PASS,
//         },
//         tls: {
//           rejectUnauthorized: false,
//         }
//       });

//     const template_ = Handlebars.compile(template || registrationEmailTemplate);
//     const rawTemplate =  template_(fields || { 
//       name: user?.dataValues?.name || name || '', otp
//      });
//     const { html, errors } = mjml2html(rawTemplate);

//     await transporter.sendMail({
//       from: `"2Zero Investment" <${process.env.GMAIL_USER}>`,
//       to: email || fields?.email,
//       subject: subject || "Verify your email with OTP",
//       html:html,
//     });
// }

// import nodemailer from "nodemailer";
// import mjml2html from "mjml";
// import Handlebars from 'handlebars';
// import dotenv from "dotenv";
// dotenv.config();

// export const sendMail = async ({
//   email,
//   subject,
//   template,
//   fields,
//   user,
//   name,
//   otp
// }) => {

//   const transporter = nodemailer.createTransport({
//     host: "in-v3.mailjet.com",
//     port: 587,
//     auth: {
//       user: process.env.MJ_APIKEY_PUBLIC,
//       pass: process.env.MJ_APIKEY_PRIVATE,
//     },
//   });

//   console.log({template})
//   const template_ = Handlebars.compile(template);
//   const rawTemplate = template_(fields || {
//     name: user?.dataValues?.name || name || "",
//     otp
//   });

//   const { html } = mjml2html(rawTemplate);

//   await transporter.sendMail({
//     from: process.env.MAILJET_SENDER_EMAIL,
//     to: email || fields?.email,
//     subject: subject || "Verify your email",
//     html,
//   });
// };

import Mailjet from 'node-mailjet';
import otpGenerator from "otp-generator";
import mjml2html from "mjml";
import Handlebars from 'handlebars';
import { registrationEmailTemplate } from "../templates/registration-template.js";
import dotenv from "dotenv";

dotenv.config();

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

export const sendMail = async ({
  email, user, otp, subject, template, name, fields = null,
}) => {
  const template_ = Handlebars.compile(template || registrationEmailTemplate);
  const rawTemplate = template_(fields || {
    name: user?.dataValues?.name || name || '', otp
  });

  const { html } = mjml2html(rawTemplate);
  await mailjet
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_SENDER_EMAIL,
            Name: "2Zero Investment"
          },
          To: [
            { Email: email || fields?.email }
          ],
          Subject: subject || "Verify your email with OTP",
          HTMLPart: html
        }
      ]
    });
};
