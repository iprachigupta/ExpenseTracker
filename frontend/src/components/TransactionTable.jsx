/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { IoReorderThreeSharp } from "react-icons/io5";
import { handleError, handleSuccess } from "../utils/toast";
import ExpenseModal from "./ExpenseModal";
import TransactionRow from "./TransactionRow";

function TransactionTable(props) {
  const {
    fetchExpenses,
    expenses,
    setExpenses,
    filters,
    setFilters,
    editExpenseId,
    setEditExpenseId,
    editData,
    setEditData,
  } = props;

  const [formData, setFormData] = useState({
    title: "",
    transactionType: "",
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  const categories = {
    income: [
      "Part-time",
      "Full-time",
      "Freelancer",
      "Salary",
      "Bonus",
      "Other",
    ],
    expense: [
      "Rent",
      "Groceries",
      "Food",
      "Medical",
      "Utilities",
      "Entertainment",
      "Transportation",
      "Other",
    ],
  };

  const today = new Date().toISOString().split("T")[0];

  const [showFilters, setShowFilters] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const tableHeadings = [
    "Title",
    "Amount",
    "Category",
    "Description",
    "Type",
    "Date",
    "Update/Delete",
  ];

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const deleteExpense = async (expenseId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/expenses/delete/${expenseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        handleSuccess(result.message);
        fetchExpenses();
      } else {
        handleError(result.error);
      }
    } catch (error) {
      handleError("Failed to delete expense");
      console.error("Error in deleteExpense:", error);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      filterCategory: "",
      filterMonth: "",
      filterTransactionType: "",
    });
    fetchExpenses();
  };

  const handleEditClick = (expense) => {
    setEditExpenseId(expense._id);
    setUpdatedData({
      title: expense.title,
      transactionType: expense.transactionType,
      category: expense.category,
      amount: expense.amount,
      description: expense.description,
      date: new Date(expense.date).toISOString().split("T")[0],
    });
    setShowUpdateModal(true);
  };

  const handleAddClick = () => {
    setShowAddExpenseModal(true);
  };

  const addExpense = async (e) => {
    e.preventDefault();

    const { title, transactionType, category, amount, description, date } =
      formData;

    if (
      !title ||
      !transactionType ||
      !category ||
      !amount ||
      !description ||
      !date
    ) {
      handleError("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/user/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        handleSuccess(result.message);
        fetchExpenses();
        setFormData({
          title: "",
          transactionType: "",
          category: "",
          amount: "",
          description: "",
          date: "",
        });
        setShowAddExpenseModal(false);
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError(error.message || "Error while saving expense.");
    }
  };

  const handleUpdateExpense = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/expenses/update/${editExpenseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();

      if (result.success) {
        handleSuccess(result.message);
        fetchExpenses();
        setShowUpdateModal(false);
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError(error.message || "Error while updating expense.");
    }
  };

  const handleDeleteClick = (expenseId) => {
    setConfirmDeleteId(expenseId);
  };

  const handleConfirmDelete = () => {
    if (confirmDeleteId) {
      deleteExpense(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div className="p-4">
      <div className="flex flex-row md:flex-row justify-between items-center mt-6 mb-4">
        <span className="text-2xl font-bold mb-4 md:mb-0 ml-2 md:ml-10">
          Expenses:
        </span>
        <div className="flex justify-end mr-2 md:mr-10">
          <button
            onClick={handleAddClick}
            className="mr-4 bg-white text-black hover:bg-slate-300 hover:scale-110 px-2 py-1 md:px-3 md:py-2 border-2 rounded-3xl text-sm md:text-base"
          >
            Add Transaction
          </button>
          <span className="text-2xl font-bold text-gray-600 mb-4">Filters</span>
          <span
            className="text-black text-3xl pl-2 mt-1 cursor-pointer"
            onClick={() => {
              setShowFilters(!showFilters);
            }}
          >
            <IoReorderThreeSharp />
          </span>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-gray-900">Month</label>
            <input
              type="month"
              value={filters.filterMonth}
              onChange={(e) =>
                setFilters({ ...filters, filterMonth: e.target.value })
              }
              className="border rounded w-full py-2 px-3"
            />
          </div>

          <div>
            <label className="block text-gray-900">Category</label>
            <select
              value={filters.filterCategory}
              onChange={(e) =>
                setFilters({ ...filters, filterCategory: e.target.value })
              }
              className="border rounded w-full py-2 px-3"
            >
              <option value="">All</option>
              {categories.expense.concat(categories.income).map((cat, index) => (
                <option key={`${cat}-${index}`} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-900">Transaction Type</label>
            <select
              value={filters.filterTransactionType}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  filterTransactionType: e.target.value,
                })
              }
              className="border rounded w-full py-2 px-3"
            >
              <option value="">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="text-center">
            <button
              onClick={resetFilters}
              className="mt-6 bg-blue-300 hover:bg-blue-400 text-black p-2 rounded-lg w-full"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Expenses Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              {tableHeadings.map((header) => (
                <th
                  key={header}
                  className="border px-4 py-2 text-xs md:text-sm lg:text-base"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <TransactionRow
              key={expense._id}
              expense={expense}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Expense Modal */}
      {showAddExpenseModal && (
        <ExpenseModal
          title={"Add Transaction"}
          expenseData={formData}
          setExpenseData={setFormData}
          saveExpense={addExpense}
          setShowExpenseModal={setShowAddExpenseModal}
          categories={categories}
          today={today}
          save={"Add"}
        />
      )}

      {/* Update Expense Modal */}
      {showUpdateModal && (
        <ExpenseModal
          title={"Update Transaction"}
          expenseData={updatedData}
          setExpenseData={setUpdatedData}
          saveExpense={handleUpdateExpense}
          setShowExpenseModal={setShowUpdateModal}
          categories={categories}
          save={"Update"}
        />
      )}

      {/* Confirmation Dialog */}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 md:p-5 rounded shadow-lg w-11/12 md:w-full max-w-md">
            <h2 className="text-lg md:text-xl font-bold mb-4">
              Confirm Deletion
            </h2>
            <p className="text-sm md:text-base">
              Are you sure you want to delete this expense?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;
