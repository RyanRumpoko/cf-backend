const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET);
};

const authenticate = function (req, res, next) {
  try {
    const token = req.headers.token;
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

module.exports = { createToken, authenticate };
