const express = require('express');
const verifyToken = require('../middlewares/VerifyToken'); 
const {changePassword, deleteAccount} = require("../controllers/SettingsController");
const { changePass } = require('../middlewares/SettingsValidation');
const router = express.Router();

router.post('/change-password', verifyToken, changePass, changePassword);

router.post("/delete-account", verifyToken, deleteAccount);

module.exports = router;
