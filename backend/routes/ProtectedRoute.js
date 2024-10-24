const verifyToken = require("../middlewares/VerifyToken");
const router = require("express").Router();
const Expense = require("../models/expense");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = new ObjectId(req.user.id);
    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const summary = await Expense.aggregate([
      { $match: { userId: userId } }, 
      {
        $group: {
          _id: { month: { $month: "$date" }, transactionType: "$transactionType" },
          totalAmount: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

    const monthlyIncome = Array(12).fill(0);
    const monthlyExpenses = Array(12).fill(0);

    summary.forEach(item => {
      if (item._id.transactionType === 'income') {
        monthlyIncome[item._id.month - 1] = item.totalAmount;
      } else if (item._id.transactionType === 'expense') {
        monthlyExpenses[item._id.month - 1] = item.totalAmount;
      }
    });

    const totalIncome = monthlyIncome.reduce((acc, val) => acc + val, 0);
    const totalExpense = monthlyExpenses.reduce((acc, val) => acc + val, 0);
    const totalOutstanding = totalIncome - totalExpense;

    res.status(200).json({
      monthlyIncome,
      monthlyExpenses,
      totalIncome,
      totalExpense,
      totalOutstanding,
      message: "Income, Expenses, and Outstanding calculated successfully!",
      success: true
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;