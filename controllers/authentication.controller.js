const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(userId) {
  const payload = {
    id: userId,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1hr" });
}

async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({
        message: "Email has already been taken",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user.id);

    res.status(201).json({ auth_token: token });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Credentials do not match our records" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ eror: "Incorrect password" });
    }

    const token = generateToken(user.id);
    res.status(200).json({ auth_token: token });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

module.exports = { register, login };
