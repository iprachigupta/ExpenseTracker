// eslint-disable-next-line no-unused-vars
import React from "react";
import AccountProfile from "../components/AccountProfile";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";

function Account() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-evenly p-4 md:p-0 ">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <Sidebar />
        </div>
        <div className="w-full md:w-3/4">
          <AccountProfile />
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

export default Account;
