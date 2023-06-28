const express = require("express");
const router = express.Router();

const AuthRouter = require("./authentication");
const ProductRouter = require("./product");
const userRouter = require("./user");

router.use("/auth", AuthRouter);
router.use("/products", ProductRouter);
router.use("/users", userRouter);

module.exports = router;
