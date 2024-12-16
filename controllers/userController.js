const pool = require("../db");
const jwt = require("jsonwebtoken");
const { createToken } = require("../middlewares/auth");

const register = async (req, res) => {
  const inputData = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const check = await pool.query(
      `SELECT * FROM users WHERE username='${inputData.username}'`
    );
    if (check.rows[0]) throw "Username is used";
    await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [
      inputData.username,
      inputData.password,
    ]);
    return res.status(200).json("Account created successfully");
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

const login = async (req, res) => {
  const inputData = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE username='${inputData.username}' LIMIT 1`
    );
    if (!result.rows[0]) throw "Invalid email or password";
    if (result.rows[0].password !== inputData.password)
      throw "Invalid email or password";
    const accessToken = createToken({ username: result.rows[0].username });
    return res
      .status(200)
      .json({ username: result.rows[0].username, accessToken });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

module.exports = {
  register,
  login,
};
