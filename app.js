require("dotenv").config();
const mongoose = require("./config/dataBaseConfig");
const express = require("express");
const app = express();
require("./config/dataBaseConfig")();
const { signUp, signIn } = require("./controller/auth.controller");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("Welcome to Home Screen");
});
app.post("/signup", signUp);
app.post("/signin", signIn);

module.exports = app;
