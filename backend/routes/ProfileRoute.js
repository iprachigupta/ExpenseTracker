const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verifyToken = require("../middlewares/VerifyToken")

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json({ name: user.name, email: user.email });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put('/', verifyToken , async (req, res) => {
  try {
    const userId = req.user.id; 
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
