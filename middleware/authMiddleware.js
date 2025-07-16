const jwt = require("jsonwebtoken");

const AuthCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.SECURITY_KEY);
    req.userId = decoded.userid;
    next();
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: "Authentication failed",
    });
  }
};

module.exports = AuthCheck;
