export default function isInvestor(req, res, next) {
  if (req.user.role !== "investor") {
    return res.status(403).json({ message: "Investors only access" });
  }
  next();
}
