const User = require("../model/user");

const signUp = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  if (!(fname && lname && email && password)) {
    res.status(400).send("Data is missing");
  }
  if (!(await User.findOne({ email }))) {
    const user = await User.create({ fname, lname, email, password });
    // console.log(user);
    res.send({ user });
  } else {
    res.send("Data already exist in db");
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.password === password) {
    res.send("Dummy Token");
  } else {
    res.send("user doesn't exist");
  }
};

module.exports = { signUp, signIn };
