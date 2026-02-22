import { parseError } from "../helpers/parseError.js";
import cloudinary from "../config/cloudinary.js";

export const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return parseError(400, "No file uploaded", next);
    }
    if (req.file.size > 5 * 1024 * 1024) {
      if (req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      return parseError(400, "File size must not exceed 5MB", next);
    }

    const fileUrl = req.file.path;
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      url: fileUrl,
    });
  } catch (error) {
    next(error);
  }
};
