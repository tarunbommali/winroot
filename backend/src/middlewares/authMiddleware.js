const jwt = require("jsonwebtoken");
const User = require("../models/user");

const checkAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

const checkRole = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied for ${req.user.role}` });
    }
    next();
  };
};

module.exports = { checkAuth, checkRole };
