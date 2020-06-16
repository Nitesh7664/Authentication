const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  //CHECKING FOR ERRORS
  const { error } = registerValidation(req.body);
  if (error) return res.send(error.details[0].message);

  //CHECKING USER ALREADY EXIST OR NOT
  let user = await User.findOne({ email: email });
  if (user) return res.status(401).send("user already exist please login");

  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

  user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (err) {
    console.error(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginValidation({ email, password });

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send("User does not exist, please register first");

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    res
      .status(201)
      .header("auth-token", token)
      .json({ user: user, status: "login successfully", token: token });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
