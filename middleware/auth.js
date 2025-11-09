import jwt from "jsonwebtoken";
import { parseError } from "../helpers/parseError.js";

export default function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 
  if (!token) parseError(401, "No token provided", next);  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    next(err);
  }
}
