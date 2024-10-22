const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    transactionType: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    date: { type: Date, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("expense", ExpenseSchema);

module.exports = Expense;
