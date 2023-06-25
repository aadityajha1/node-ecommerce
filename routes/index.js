const express = require("express");
const router = express.Router();

const AuthRouter = require("./authentication");
const ProductRouter = require("./product");

router.use("/auth", AuthRouter);
router.use("/products", ProductRouter);

module.exports = router;
