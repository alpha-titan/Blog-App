require("dotenv/config");
const jwt = require("jsonwebtoken");
const User = require("../models/Users.model");

module.exports = async function (req, res, next) {
  //get the user token
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  //verify the token with JWT verify
  try {
    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = verifiedToken;
    const userdata = await User.findOne({ _id: _id });
    req.user = userdata;
    next();
  } catch (err) {
    console.error(e);
    res.status(500).json({ message: "Invalid Token" });
  }
};
