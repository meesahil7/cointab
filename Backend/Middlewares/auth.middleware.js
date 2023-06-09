const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.auth;
  if (token) {
    const decoded = jwt.verify(token, process.env.KEY);
    if (decoded) {
      const userID = decoded.userID;
      req.body.userID = userID;
      next();
    } else {
      res.send("Please login first.");
    }
  } else {
    res.send("Please login first.");
  }
};

module.exports = { authenticate };
