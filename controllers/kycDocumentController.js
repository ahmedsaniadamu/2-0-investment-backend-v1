import { paginate } from "../helpers/pagination.js";
import { db } from "../models/index.js";
import { parseError } from "../helpers/parseError.js";
import { validateUploadedDocuments } from "../helpers/validateDocuments.js";
import { sendMail } from "../services/authService.js";
import { kycApprovedEmailTemplate, kycPendingEmailTemplate, kycRejectedEmailTemplate } from "../templates/kyc-status-template.js";
import dotenv from "dotenv";

dotenv.config();

const { KycDocument, InvestorKycRequest, Investors } = db;

export const createKycDocument = async (req, res, next) => {
  try {
    const { name, description, required, fileTypes } = req.body;

    if (!name || !fileTypes)
      return parseError(400, "Name and fileTypes are required", next);

    const isExist = await KycDocument.findOne({ where: { name } });
    if (isExist) return parseError(400, "Document already exists", next);

    const doc = await KycDocument.create({
      name,
      description,
      required: required ?? false,
      fileTypes,
    });

    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const getKycDocuments = async (req, res, next) => {
  try {
    const result = await paginate(KycDocument, req, {
      searchable: ["name", "description"],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getKycDocumentById = async (req, res, next) => {
  try {
    const doc = await KycDocument.findByPk(req.params.id);
    if (!doc) return parseError(404, "KYC Document not found", next);

    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const updateKycDocument = async (req, res, next) => {
  try {
    const { name, description, required, fileTypes } = req.body;
    const doc = await KycDocument.findByPk(req.params.id);

    if (!doc) return parseError(404, "KYC Document not found", next);

    if (!name || !fileTypes)
      return parseError(400, "Name and fileTypes are required", next);

    await doc.update({
      name,
      description,
      required: required ?? doc.required,
      fileTypes,
    });

    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    next(error);
  }
};

export const deleteKycDocument = async (req, res, next) => {
  try {
    const doc = await KycDocument.findByPk(req.params.id);
    if (!doc) return parseError(404, "KYC Document not found", next);

    await doc.destroy();
    res.status(200).json({ success: true, message: "KYC Document deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const uploadDocument = async (req, res, next) => {
  try {
    const kycDocuments = await KycDocument.findAll();
    if (!kycDocuments) return parseError(404, "KYC Documents not found", next);
    const _validateUploadedDocuments = validateUploadedDocuments(
      kycDocuments,
      req.body.documents
    );
    if (_validateUploadedDocuments.valid) {
      const investor = await Investors.findOne({ where: { id: req.body.investorId } });
      if (!investor) return parseError(404, "Investor not found", next);
      const requestExist = await InvestorKycRequest.findOne({ where: { investorId: req.body.investorId } });
      if (!requestExist) {
        await InvestorKycRequest.create({ ...req.body, status: 'pending' });

      } else {
        await InvestorKycRequest.update({ documents: req.body.documents, status: 'pending' }, {
          where: { investorId: req.body.investorId }
        });
      }
      await sendMail({
        fields: {
          name: investor?.dataValues?.name || '',
          email: investor.email,
          dashboardLink: `${process.env.DASHBOARD_REDIRECT_URL}/login?action=view-kyc-status`,
          supportLink: `${process.env.SUPPORT_REDIRECT_URL}`
        },
        subject: "KYC Documents Verification (2Zero Investment)",
        template: kycPendingEmailTemplate
      });
      res.status(200).json({ success: true, message: "Documents uploaded successfully! check your email for further instructions" });
    }
    else {
      return parseError(_validateUploadedDocuments.statusCode, _validateUploadedDocuments.errors, next);
    }
  } catch (error) {
    next(error);
  }
};

export const getInvestorsKycRequests = async (req, res, next) => {
  try {
    const result = await paginate(InvestorKycRequest, req, {
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Investors, as: "investor",
          searchable: ["name", "email", "phone_number"],
          attributes: { exclude: ['password', 'index', 'role'] }
        },
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const reviewKycRequest = async (req, res, next) => {
  try {
    const { status, reason } = req.body;
    const request = await InvestorKycRequest.findByPk(req.params.id);
    if (!request) return parseError(404, "KYC Request not found", next);
    if (!status) return parseError(400, "Status is required", next);
    const investor = await Investors.findOne({ where: { id: request?.investorId } });
    if (!investor) return parseError(404, "Investor not found", next);
    if (status === 'rejected') {
      if (!reason) return parseError(400, "Reason for rejection is required", next);
      sendMail({
        fields: {
          name: investor?.name || '',
          reason,
          email: investor?.email,
          supportLink: `${process.env.SUPPORT_REDIRECT_URL}`,
          guidelinesLink: `${process.env.GUIDELINES_REDIRECT_URL}/kyc-guidelines`,
        },
        subject: "KYC Request Verification Status (2Zero Investment)",
        template: kycRejectedEmailTemplate
      })
    }
    else {
      sendMail({
        fields: {
          name: investor?.name || '',
          email: investor?.email,
          dashboardLink: `${process.env.DASHBOARD_REDIRECT_URL}/login?action=view-kyc-status`,
          supportLink: `${process.env.SUPPORT_REDIRECT_URL}`
        },
        subject: "KYC Request Verification Status (2Zero Investment)",
        template: kycApprovedEmailTemplate
      })
    }
    await request.update({ status, });
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
};

export const getInvestorsKycSummary = async (req, res, next) => {
  try {
    const [total, approved, pending, rejected] = await Promise.all(
      [InvestorKycRequest.count(),
      InvestorKycRequest.count({ where: { status: "approved" } }),
      InvestorKycRequest.count({ where: { status: "pending" } }),
      InvestorKycRequest.count({ where: { status: "rejected" } }),]
    );

    res.status(200).json({
      total,
      approved,
      pending,
      rejected,
    });
  } catch (error) {
    next(error);
  }
};
