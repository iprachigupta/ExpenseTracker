/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import Expense from "../components/Expense";

function Transactions() {
  return (
    <>
      <div className="flex flex-row h-screen">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-2/4">
          <Expense />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className=""
      />
    </>
  );
}

export default Transactions;
