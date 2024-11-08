/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import FiltersModal from "./FiltersModal";

function ConfirmationModal({
  title,
  ask,
  confirm,
  handleConfirm,
  handleCancel,
  filters,
  setFilters,
  resetFilters,
  transactionType,
  handleTransactionTypeChange,
  categories,
  displayFilter,
  displayResetFilter,
}) {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 md:p-5 rounded shadow-lg w-11/12 md:w-full max-w-md">
          <h2 className="text-lg md:text-xl font-bold mb-4">{title}</h2>
          {/* <p className="text-sm md:text-base">Applied Filters ...</p> */}
          {displayFilter && (
            <FiltersModal
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              transactionType={transactionType}
              handleTransactionTypeChange={handleTransactionTypeChange}
              categories={categories}
              displayResetFilter={displayResetFilter}
            />
          )}
          <p className="text-sm md:text-base">{ask}</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:scale-110 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:scale-110 hover:bg-red-700"
            >
              {confirm}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
