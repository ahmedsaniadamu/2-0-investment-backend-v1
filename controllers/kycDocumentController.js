import { paginate } from "../helpers/pagination.js";
import { db } from "../models/index.js";
import { parseError } from "../helpers/parseError.js";

const { KycDocument } = db;

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
