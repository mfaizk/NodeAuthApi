require("dotenv").config();
const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
require("./config/dataBaseConfig")();
const { signUp, signIn, dashBoard } = require("./controller/auth.controller");
const auth = require("./middleware/auth");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.send("Welcome to Home Screen");
});
app.post("/signup", signUp);
app.post("/signin", signIn);
app.get("/dashboard", auth, dashBoard);

module.exports = app;
