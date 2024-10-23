const { signupValidation , loginValidation} = require("../middlewares/AuthValidation");
const {signup, login, logout} = require("../controllers/AuthController");
const verifyToken = require("../middlewares/VerifyToken");
const router = require("express").Router();
const Expense = require("../models/expense");

//routes
router.post("/login", loginValidation, login)
router.post("/signup", signupValidation, signup)

router.get("/refresh-token", verifyToken,(req,res)=>{
    res.status(200).json({ success : true });
});

router.post("/logout", logout);



module.exports = router;

