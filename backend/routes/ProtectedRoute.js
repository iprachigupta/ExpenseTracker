const verifyToken = require("../middlewares/VerifyToken");
const router = require("express").Router();
const Expense = require("../models/expense");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const moment = require('moment');

router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = new ObjectId(req.user.id);
    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const currentMonth = moment().startOf("month");
    const monthlyIncome = Array(12).fill(0);
    const monthlyExpenses = Array(12).fill(0);

    const lastYearExpenses = await Expense.find({
      userId,
      date: { $gte: moment(currentMonth).subtract(11, "months").toDate() },
    });

    lastYearExpenses.forEach((expense) => {
      const monthIndex = 11 - moment(currentMonth).diff(moment(expense.date), "months");

      if (expense.transactionType === "income") {
        monthlyIncome[monthIndex] += expense.amount;
      } else if (expense.transactionType === "expense") {
        monthlyExpenses[monthIndex] += expense.amount;
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
      success: true
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;