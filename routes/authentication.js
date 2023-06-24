const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.sendStatus(200);
});

router.post("/login", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
