const jwt = require("jsonwebtoken");

module.exports.verifytoken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(201).send("unauthorized user detected");

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      req.userId = payload.userId;
      next();
    });
  } catch (error) {}
};
