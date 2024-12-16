const express = require("express");
const router = express.Router();
const Controller = require("../controllers/todoController");
const { authenticate } = require("../middlewares/auth");

router.get("/", authenticate, Controller.getTodo);
router.post("/", authenticate, Controller.addTodo);
router.delete("/:id", authenticate, Controller.deleteTodo);

module.exports = router;
