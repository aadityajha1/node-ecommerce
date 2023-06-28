const express = require("express");
const router = express.Router();
const { getUsers , updateUsers } = require("../controllers/userController");
const Auth = require("../middlewares/auth")
const Role = require("../middlewares/role")
router.get("/", getUsers)

router.patch("/", updateUsers)

module.exports = router;
