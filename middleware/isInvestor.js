import { parseError } from "../helpers/parseError.js";

export default function isInvestor(req, res, next) {
  if (req.user.role !== "investor") {
    return parseError(403, "Investors only access", next);
  }
  next();
}
