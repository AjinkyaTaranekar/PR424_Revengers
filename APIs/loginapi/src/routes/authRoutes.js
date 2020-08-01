const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const UserProfile = mongoose.model("UserProfile");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { phoneno, password } = req.body;

  try {
    console.log("/signup");
    console.log("This is Req.body", req.body);
    const user = new User({ phoneno, password });

    await user.save();
    const token = jwt.sign({ userId: user._id }, "MY_SECERET");
    res.send({ token });
  } catch (err) {
    // console.log("There is an err", err);

    res.status(422).send(err.message);
  }
});
router.post("/updateUserProfile", async (req, res) => {
  const { phoneno, password, email, aadharno, name } = req.body;
  console.log(req.body);

  try {
    console.log("/updateUserProfile");
    const user = new UserProfile({ phoneno, password, email, aadharno, name });

    await user.save();
    const token = jwt.sign({ userId: user._id }, "MY_SECERET");
    console.log("token", token);
    res.send({ token });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/signin", async (req, res) => {
  console.log("/signin");
  const { phoneno, password } = req.body;
  if (!phoneno || !password) {
    return res
      .status(422)
      .send({ error: "Must provide phone no and password" });
  }

  const user = await User.findOne({ phoneno });
  if (!user) {
    return res.status(422).send({ error: "Invalid Password or Phone No....." });
  }

  try {
    await user.comparePassword(password);

    const token = jwt.sign({ userId: user._id }, "MY_SECERET");

    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid Password or Phone No. $ " });
  }
});
module.exports = router;
