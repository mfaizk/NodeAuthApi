const User = require("../model/user");
const { SECRET } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);

  if (!(fname && lname && email && password)) {
    res.status(400).send("Data is missing");
  }
  if (!(await User.findOne({ email }))) {
    const hashPassword = await bcrypt.hash(password, salt);
    // console.log(hashPassword);
    const user = await User.create({
      fname,
      lname,
      email,
      password: hashPassword,
    });
    user.password = undefined;
    res.send({ user });
  } else {
    res.send("User already exist in db");
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // console.log(await bcrypt.compare(password, user.password));
  const token = jwt.sign({ email: user.email, id: user._id }, SECRET, {
    expiresIn: "2days",
  });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      user.password = undefined;
      res.status(200).cookie("token", token, { httpOnly: true }).send({
        user,
      });
      // res.send(jwt.sign({ email }, SECRET));
    } else {
      res.send("password isn't correct");
    }
  } else {
    res.send("user doesn't exist");
  }
};

const dashBoard = (req, res) => {
  res.send("Welcome to dashboard");
};

module.exports = { signUp, signIn, dashBoard };
