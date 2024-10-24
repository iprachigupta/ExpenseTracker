const User = require("../models/user");
const Expense = require("../models/expense");


const addTransaction = async (req, res) => {
  const { title, amount, category, description, transactionType, date } =
    req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const newExpense = new Expense({
      title,
      amount,
      category,
      description,
      transactionType,
      date,
      userId: req.user.id,
    });

    await newExpense.save();
    res
      .status(201)
      .json({ success: true, message: "Expense added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    } else {
      const expenseId = req.params.id;
      const deletedExpense = await Expense.findByIdAndDelete(expenseId);
      if (!deletedExpense) {
        return res
          .status(404)
          .json({ success: false, message: "Expense not found" });
      }
      return res.status(200).json({
        success: true,
        message: "Expense deleted successfully",
        deletedExpense,
      });
    }
  } catch {
    return res
      .status(500)
      .json({ success: false, error: "Error while deleting the expense" });
  }
};

const updateTransaction = async (req, res) => {
  const expenseId = req.params.id;
  const updateData = req.body;

  if (!Object.keys(updateData).length) {
    return res
      .status(400)
      .json({ success: false, message: "No data provided for update." });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    } else {
      const updatedExpense = await Expense.findByIdAndUpdate(
        expenseId,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedExpense) {
        return res
          .status(404)
          .json({ success: false, message: "Expense not found" });
      }

      res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        updatedExpense,
      });
    }
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const filterTransaction = async (req, res) => {
  try {
    const { month, category, transactionType } = req.query;

    let filter = { userId: req.user.id };

    if (month) {
      const [year, monthValue] = month.split("-");
      const startDate = new Date(`${year}-${monthValue}-01`);
      const endDate = new Date(`${year}-${parseInt(monthValue) + 1}-01`);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    if (category) {
      filter.category = category;
    }

    if (transactionType) {
      filter.transactionType = transactionType;
    }

    const expenses = await Expense.find(filter);
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addTransaction,
  deleteTransaction,
  updateTransaction,
  filterTransaction,
};
