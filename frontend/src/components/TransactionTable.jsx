/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils/toast";
import ExpenseModal from "./ExpenseModal";
import TransactionRow from "./TransactionRow";
import { FaFilter } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";

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

  const today = new Date().toISOString().split("T")[0];

  const [showFilters, setShowFilters] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [categories, setCategories] = useState({ income: [], expense: [] });
  const [transactionType, setTransactionType] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
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
    fetchCategories();
  }, [fetchExpenses]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/categories", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const result = await response.json();
      if (Array.isArray(result) && result.length > 0) {
        const incomeCategories = result
          .filter((cat) => cat.type === "income")
          .map((cat) => cat.name);
        const expenseCategories = result
          .filter((cat) => cat.type === "expense")
          .map((cat) => cat.name);

        setCategories({ income: incomeCategories, expense: expenseCategories });
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError("Failed to fetch categories");
    }
  };

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
    setTransactionType("");
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

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
    setFilters({ ...filters, filterTransactionType: e.target.value });
  };

  const handleExportClick = (e) => {
    setShowExportModal(true);
  };

  const handleConfirmExport = (e) => {
    //export ho jayegi pdf and mesgae toast ho jayega
  };

  const handleCancelExport = (e) => {
    setShowExportModal(false);
  };

  return (
    <div className="p-4">
      <div className="flex flex-row md:flex-row justify-between items-center mt-6 mb-4">
        <div className="text-2xl font-bold mb-4 md:mb-0 ml-2 md:ml-10">
          Expenses:
        </div>
        <div className="flex justify-end mr-2 md:mr-10">
          <button
            onClick={handleAddClick}
            className="mr-4 bg-white text-black hover:bg-slate-300 hover:scale-110 px-2 py-1 md:px-3 md:py-2 border-2 rounded text-sm md:text-base"
          >
            Add Transaction
          </button>
          <span
            className="text-black text-xl pl-2 pr-4 mt-1 cursor-pointer py-1 hover:scale-125"
            onClick={() => {
              setShowFilters(!showFilters);
            }}
          >
            <FaFilter />
          </span>
          <button
            onClick={handleExportClick}
            className=" bg-green-500 text-white hover:bg-green-700 hover:scale-110 px-2 py-1 md:px-3 md:py-2 border-2 rounded text-sm md:text-base"
          >
            Export
          </button>
        </div>
      </div>

      {showExportModal && (
        <ConfirmationModal
          title={"Confirm Export :"}
          ask={"Are you sure you want to export this transaction? "}
          handleConfirm={handleConfirmExport}
          handleCancel={handleCancelExport}
        />
      )}

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
            <label className="block text-gray-900">Transaction Type</label>
            <select
              value={transactionType}
              onChange={handleTransactionTypeChange}
              className="border rounded w-full py-2 px-3"
            >
              <option value="">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
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
              {transactionType
                ? categories[transactionType].map((cat, index) => (
                    <option key={`${cat}-${index}`} value={cat}>
                      {cat}
                    </option>
                  ))
                : categories.expense
                    .concat(categories.income)
                    .map((cat, index) => (
                      <option key={`${cat}-${index}`} value={cat}>
                        {cat}
                      </option>
                    ))}
            </select>
          </div>

          {/* Reset Filters */}
          <div className="text-center">
            <button
              onClick={resetFilters}
              className="mt-6 bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg w-full"
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
        <ConfirmationModal
          title={"Confirm Delete :"}
          ask={"Are you sure you want to delete this transaction? "}
          handleConfirm={handleConfirmDelete}
          handleCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default TransactionTable;
