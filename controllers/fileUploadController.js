import { parseError } from "../helpers/parseError.js";

export const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      parseError(400, "No file uploaded", next);
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
