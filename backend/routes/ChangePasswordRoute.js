const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); 
const verifyToken = require('../middlewares/VerifyToken'); 
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
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

module.exports = router;
