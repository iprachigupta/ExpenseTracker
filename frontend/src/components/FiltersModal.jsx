/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function FiltersModal(props) {
  const {
    filters,
    setFilters,
    resetFilters,
    transactionType,
    handleTransactionTypeChange,
    categories,
    displayResetFilter,
  } = props;
  return (
    <div>
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
            <option value="all">All</option>
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
        {displayResetFilter && (
          <div className="text-center">
            <button
              onClick={resetFilters}
              className="mt-6 bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg w-full"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FiltersModal;
