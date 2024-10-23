const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); 
const verifyToken = require('../middlewares/VerifyToken'); 
const router = express.Router();

router.post('/change-password', verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findById(req.user.id); 

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    if (currentPassword === newPassword) {
        return res.status(400).json({ message: 'New password must be different from the current password' });
    }
    
    const newpass = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, newpass);
    
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/delete-account", verifyToken, async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id; 
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if(!password){
      return res.status(400).json({message: "Please enter the password"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    user.is_deleted = true;
    await user.save();

    res.clearCookie("accessToken", {
      path: "/",
    });
    res.clearCookie("refreshToken", {
      path: "/",
    });

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});
module.exports = router;
