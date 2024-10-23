/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [password, setPassword] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

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
      setTimeout(() => {
        navigate("/account");
      }, 1500);
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDialog(false);
    setShowPasswordDialog(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8080/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        handleSuccess(data.message);
        setSuccess("Account deleted successfully.");
        setShowPasswordDialog(false);
        setTimeout(() => {
          navigate("/signup");
        }, 1500);
      } else {
        handleError(data.message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-start items-start h-screen bg-white">
        <div>
          <Sidebar />
        </div>
        <div className="md:ml-96 w-full p-6 sm:p-4 mt-24">
          <h2 className="mb-6 text-3xl font-bold">Change Password</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleChangePassword} className="w-full max-w-md">
            <div className="mb-4">
              <label className="block mb-2 text-md font-medium text-gray-700">
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
              <label className="block mb-2 text-md font-medium text-gray-700">
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
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Change Password
            </button>
          </form>
          <hr className="w-full my-8"></hr>
          <div>
            <h2 className="text-2xl font-bold text-red-600 ">
              Want to Delete Your Account?
            </h2>
            <button
              onClick={handleDeleteClick}
              className="mt-5 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-red-600 hover:text-white"
            >
              Delete Account
            </button>
            {showConfirmDialog && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                  <p className="mb-4">
                    Are you sure you want to delete your account?
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={handleConfirmDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Yes, Sure
                    </button>
                    <button
                      onClick={handleCancelDelete}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showPasswordDialog && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                  <h3 className="text-md font-bold mb-4">
                    Enter your password to delete your account . . .
                  </h3>
                  <form onSubmit={handleDeleteAccount}>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 mb-2 text-sm"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setShowPasswordDialog(false)}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
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

export default Settings;