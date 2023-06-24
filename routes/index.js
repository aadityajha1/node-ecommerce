const express = require("express");
const router = express.Router();

const AuthRouter = require("./authentication");

router.use("/auth", AuthRouter);

module.exports = router;
