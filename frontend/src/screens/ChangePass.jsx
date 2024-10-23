/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AccountSidebar from "../components/AccountSidebar";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      handleError("New passwords don't match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error changing password");
      }
      handleSuccess(data.message);
      setTimeout(()=>{
        navigate("/account")
      },1500)
    } catch (error) {
      handleError(error.message)
    }
  };

  return (
    <>
      <div className="flex flex-row justify-start items-center h-screen">
        <div>
          <AccountSidebar />
        </div>
        <div className="w-1/2 h-auto mx-auto bg-gradient-to-r from-blue-300 to-purple-300 shadow-xl rounded-lg p-16">
          <h2 className="mb-6 text-3xl font-bold text-center">
            Change Password
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label className="block mb-2 text-md font-medium text-gray-900">
                Current Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-md font-medium text-gray-900">
                New Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your new password"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Change Password
            </button>
          </form>
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
};

export default ChangePassword;
