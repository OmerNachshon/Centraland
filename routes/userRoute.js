const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

//
router.route("/createUser").post(async (req, res) => {
  const { id, name, email, password, funds } = req.body;
 
  try {
    const newUser = new User({
      id,
      name,
      email,
      password,
      funds,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch {
    res.status(500).json({ msg: "something went wrong!" });
  }
});

router.route("/users").get((req, res) => {
  User.findOne().then((foundUsers) => res.json(foundUsers));
});

router.route("/findUser").get(async (req, res) => {
  const {email}= req.query;
  console.log(email);
  try {
    const foundUser = await User.findOne({email:email});
    res.status(201).json(foundUser);
  } catch {
    res.status(500).json({ msg: "user could not be found" });
  }
});

router.route("/findUserId").get(async (req, res) => {
  const {id}= req.query;
  try {
    const foundUser = await User.findOne({id:id});
    res.status(201).json(foundUser);
  } catch {
    res.status(500).json({ msg: "user could not be found" });
  }
});

router.route("/countUsers").get(async (req, res) => {
  const count = await User.countDocuments({});
  console.log(count);
  res.status(201).json(count);
});

router.route("/deleteUsers").delete(async (req, res) => {
  const { deletedCount } = await User.deleteMany();
  res.status(202).json({ deletedCount });
});

router.put("/updateUser/:postId", async (req, res) => {
  try {
    const { newFunds } = req.body;
    const updatePost = await User.updateOne(
      { id: req.params.postId },
      { funds: newFunds }
    );
    res.status(201).json(updatePost);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
