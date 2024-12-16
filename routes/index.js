const express = require("express");
const router = express.Router();
const user = require("./userRouter");
const todo = require("./todoRouter");
const ai = require("./aiRouter");

router.use("/", user);
router.use("/todo", todo);
router.use("/ai", ai);

module.exports = router;
