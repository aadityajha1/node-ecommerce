"use strict";

const express = require("express");
const sequelize = require("./db");
const app = express();
require("dotenv").config();
const Router = require("./routes/index");

const PORT = process.env.PORT | 3000;

// Middlewares
app.use(express.json());

// Routers
app.use(Router);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connection established to database.");
  })
  .catch((error) => {
    console.error("Unable to connect to database:", error);
  });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
