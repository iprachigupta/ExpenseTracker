const verifyToken = require("../middlewares/VerifyToken");
const router = require("express").Router();
const Expense = require("../models/expense");


router.get('/', verifyToken, async (req, res) => {
  
  try {
    const userId = req.user.id;
    console.log(userId);
    const income = await Expense.aggregate([
      { $match: { transactionType: 'income', userId : userId } },
      {
        $group: {
          _id: { $month: "$date" }, 
          totalIncome: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } } 
    ]);

    console.log(income)
    const expenses = await Expense.aggregate([
      { $match: { transactionType: 'expense', userId : userId } },
      {
        $group: {
          _id: { $month: "$date" },
          totalExpense: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const monthlyIncome = Array(12).fill(0); 
    const monthlyExpenses = Array(12).fill(0); 

    income.forEach(item => {
      monthlyIncome[item._id - 1] = item.totalIncome;
    });

    expenses.forEach(item => {
      monthlyExpenses[item._id - 1] = item.totalExpense;
    });

    const totalIncome = income.reduce((acc, curr) => acc + curr.totalIncome, 0);
    const totalExpense = expenses.reduce((acc, curr) => acc + curr.totalExpense, 0);
    const totalOutstanding = totalIncome - totalExpense;

    console.log(totalIncome, totalExpense, totalOutstanding);
    res.json({
      monthlyIncome,
      monthlyExpenses,
      totalIncome,
      totalExpense,
      totalOutstanding,
      message: "Welcome to Dashboard !!",
      success: true
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});


module.exports = router;
