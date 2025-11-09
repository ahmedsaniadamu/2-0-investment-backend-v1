import { parseError } from "../helpers/parseError.js";

export default function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    parseError(403,  "Admins only access", next)    
  }
  next();
}