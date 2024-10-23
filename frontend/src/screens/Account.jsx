// eslint-disable-next-line no-unused-vars
import React from "react";
import AccountProfile from "../components/AccountProfile";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";

function Account() {
  return (
    <>
      <div className="flex flex-row justify-evenly items-center h-screen ">
        <Sidebar />
        <AccountProfile />
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
