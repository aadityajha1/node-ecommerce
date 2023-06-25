const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
const checkRole = require("../middlewares/role");

router.use(isAuthenticated, checkRole(["admin", "seller"]));

router.post("/all", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
