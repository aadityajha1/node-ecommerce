const express = require("express");
const router = express.Router();
const { getUsers , updateUsers , deleteUsers, uploadProfilePicture } = require("../controllers/userController");
const Auth = require("../middlewares/auth")
const Role = require("../middlewares/role")
const upload = require("../middlewares/upload")

router.get("/", getUsers)

router.patch("/", updateUsers)

router.delete("/", deleteUsers)

router.patch("/avatar", upload.single('photo'), uploadProfilePicture)

module.exports = router;
