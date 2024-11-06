// eslint-disable-next-line no-unused-vars
import React from "react";
import AccountProfile from "../components/AccountProfile";
import AdminSidebar from "../components/AdminSidebar";
import { ToastContainer } from "react-toastify";

function AdminAccount() {
  return (
    <>
      <div className="flex flex-row justify-evenly items-center h-screen ">
        <AdminSidebar />
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

export default AdminAccount;
