"use strict";

const express = require("express");
const app = express();

const PORT = 8000;

// Middlewares
app.use(express.json());

// Routers
app.get("/api/foo", (req, res) => {
  res.send("bar");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
