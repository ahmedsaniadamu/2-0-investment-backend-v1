export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err);

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Malformed JSON in request body",
    });
  }

  if (err.name === "SequelizeValidationError") {
    const messages = err.errors.map(e => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: messages,
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    const messages = err.errors.map(e => e.message);
    return res.status(409).json({
      success: false,
      message: "Duplicate entry",
      errors: messages,
    });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(409).json({
      success: false,
      message: "Cannot delete: record is still in use",
    });
  }

  if (err.name === "SequelizeDatabaseError") {
    return res.status(500).json({
      success: false,
      message: "Database error",
      detail: err.message,
    });
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  if (err.statusCode && err.message) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
