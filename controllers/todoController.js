const pool = require("../db");

const getTodo = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todo");

    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

const addTodo = async (req, res) => {
  try {
    const inputData = {
      title: req.body.title,
    };

    await pool.query(`INSERT INTO todo (title, description) VALUES ($1, $2)`, [
      inputData.title,
      "",
    ]);

    return res.status(200).json("Todo created successfully");
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;

    await pool.query(`DELETE FROM todo WHERE id=${id}`);

    return res.status(200).json("Todo deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

module.exports = {
  getTodo,
  addTodo,
  deleteTodo,
};
