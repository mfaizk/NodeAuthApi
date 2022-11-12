const jwt = require("jsonwebtoken");
const User = require("../model/user");
const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(403).send("Token not found");
  }

  const decodedData = jwt.decode(token, process.env.SECRET);
  console.log(decodedData);
  if (!decodedData) {
    res.status(403).send("Invalid Token");
  }
  const user = await User.findOne({ _id: decodedData.id });
  if (!user) {
    res.send("User Doesn't exist");
  }

  return next();
};

module.exports = auth;
