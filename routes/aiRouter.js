const express = require("express");
const router = express.Router();
const Controller = require("../controllers/aiController");

router.get("/thread", Controller.createThread);
router.post("/message", Controller.createMessages);

module.exports = router;
