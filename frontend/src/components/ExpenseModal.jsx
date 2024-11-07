/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const ExpenseModal = ({
  title,
  expenseData,
  setExpenseData,
  saveExpense,
  setShowExpenseModal,
  categories,
  today,
  save,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white px-5 py-6 rounded-3xl shadow-lg w-11/12 md:w-full max-w-md">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
          {title}
        </h2>

        <div>
          <label className="block text-gray-900 font-medium mb-1">Title</label>
          <input
            type="text"
            value={expenseData.title}
            onChange={(e) =>
              setExpenseData({ ...expenseData, title: e.target.value })
            }
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-2"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div>
            <label className="block text-gray-900 font-medium mb-1">
              Transaction Type
            </label>
            <select
              value={expenseData.transactionType}
              onChange={(e) => {
                setExpenseData({
                  ...expenseData,
                  transactionType: e.target.value,
                  category: "",
                });
              }}
              className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Choose...
              </option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {expenseData.transactionType && (
            <div>
              <label className="block text-gray-900 font-medium mb-1">
                Category
              </label>
              <select
                value={expenseData.category}
                onChange={(e) =>
                  setExpenseData({ ...expenseData, category: e.target.value })
                }
                className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Choose...
                </option>
                {expenseData.transactionType === "income"
                  ? categories.income.map((cat, index) => (
                      <option key={`${cat}-${index}`} value={cat}>
                        {cat}
                      </option>
                    ))
                  : categories.expense.map((cat, index) => (
                      <option key={`${cat}-${index}`} value={cat}>
                        {cat}
                      </option>
                    ))}
              </select>
            </div>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-gray-900 font-medium mb-1">Amount</label>
          <input
            type="number"
            value={expenseData.amount}
            onChange={(e) =>
              setExpenseData({ ...expenseData, amount: e.target.value })
            }
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-900 font-medium mb-1">
            Description
          </label>
          <textarea
            value={expenseData.description}
            onChange={(e) =>
              setExpenseData({ ...expenseData, description: e.target.value })
            }
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-2"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-900 font-medium mb-1">Date</label>
          <input
            type="date"
            value={expenseData.date}
            max={today}
            onChange={(e) =>
              setExpenseData({ ...expenseData, date: e.target.value })
            }
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-2"
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={saveExpense}
            className="bg-green-500 text-white hover:scale-95 px-4 py-2 rounded mr-2"
          >
            {save}
          </button>
          <button
            onClick={() => setShowExpenseModal(false)}
            className="bg-gray-300 text-black hover:scale-95 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
