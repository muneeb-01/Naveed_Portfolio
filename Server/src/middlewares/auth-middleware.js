const jwt = require("jsonwebtoken");

module.exports.verifytoken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
      if (err) return res.status(403).json({ message: "Token invalid" });

      req.userId = payload.userId;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
