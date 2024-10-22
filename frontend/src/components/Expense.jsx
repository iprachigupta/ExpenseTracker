/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { handleError } from "../utils/toast";
import TransactionTable from "./TransactionTable";

function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    filterCategory: "",
    filterMonth: "",
    filterTransactionType: "",
  });

  const [editExpenseId, setEditExpenseId] = useState(null);
  const [editData, setEditData] = useState({
    editTitle: "",
    editTransactionType: "",
    editCategory: "",
    editAmount: "",
    editDescription: "",
    editDate: "",
  });

  const fetchExpenses = useCallback(async () => {
    const { filterMonth, filterCategory, filterTransactionType } = filters;
    const queryParams = new URLSearchParams();
    if (filterMonth) {
      const formattedMonth = new Date(filterMonth).toISOString().slice(0, 7);
      queryParams.append("month", formattedMonth);
    }
    if (filterCategory) queryParams.append("category", filterCategory);
    if (filterTransactionType)
      queryParams.append("transactionType", filterTransactionType);
    try {
      const response = await fetch(
        `http://localhost:8080/api/expenses?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        setExpenses(result.expenses);
      } else {
        handleError(result.message);
      }
    } catch (error) {
      handleError(error);
    }
  }, [filters]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div className="absolute mt-24 lg:mt-0 lg:left-64 right-0 lg:right-0 lg:mx-auto lg:p-4">
      <div className="grid grid-cols-1 gap-10 ">
        <TransactionTable
          fetchExpenses={fetchExpenses}
          expenses={expenses}
          setExpenses={setExpenses}
          filters={filters}
          setFilters={setFilters}
          editExpenseId={editExpenseId}
          setEditExpenseId={setEditExpenseId}
          editData={editData}
          setEditData={setEditData}
        />
      </div>
    </div>
  );
}

export default Expense;
