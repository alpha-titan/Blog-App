const express = require("express");
const router = express.Router();
const { registrationValidation, loginValidation } = require("../validation");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const User = require("../models/Users.model");

router.post("/register", async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;

  // Validation
  const { error } = registrationValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //checking if the username exists
  const usernameExist = await User.findOne({ username: username });
  if (usernameExist)
    return res.status(400).json({ error: "username already exists" });

  //Check if the email already exists
  const emailExist = await User.findOne({ email: email });
  if (emailExist)
    return res.status(400).json({ error: "Email already exists" });

  //hashing password
  const salt = await bycrypt.genSalt(14); //generarting salt
  const hashedPassword = await bycrypt.hash(password, salt);

  try {
    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json({ message: "saved succefully" });
  } catch (err) {
    res.json({ error: err });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //Check if the user doesnot exists
  const user = await User.findOne({ username: username });
  if (!user) return res.status(400).json({ error: "User does not exists" });

  //Check if the password match
  const validPass = await bycrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ error: "Invalid password" });

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET); //send payload in object while signing token
  req.header("auth-token", token);
  res.json({ token, user: { _id: user._id }, message: "logged in succefully" });
  console.log(token);
});

module.exports = router;
