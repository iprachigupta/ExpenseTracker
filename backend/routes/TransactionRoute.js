const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/VerifyToken");
const {transaction} = require ("../middlewares/TransactionValidation");
const {addTransaction, deleteTransaction, updateTransaction, filterTransaction} = require("../controllers/TransactionController");


router.post("/", verifyToken, transaction,  addTransaction);

router.get("/", verifyToken, filterTransaction);

router.delete("/delete/:id", verifyToken, deleteTransaction);

router.put("/update/:id", verifyToken, updateTransaction);

module.exports = router;
