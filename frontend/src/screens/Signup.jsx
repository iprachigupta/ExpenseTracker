import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils/toast";
import Logo from "../components/Logo";

function Signup() {
  const [users, setUsers] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSecretKeyDialog, setShowSecretKeyDialog] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUsers((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = users;
    if (!name || !email || !password || !confirmPassword)
      return handleError("All Fields Are Required");

    if (password !== confirmPassword)
      return handleError("Passwords do not match");

    // Show secret key dialog if "Admin" is selected
    if (isAdmin) {
      setShowSecretKeyDialog(true);
      return;
    }

    await createAccount();
  };

  const createAccount = async () => {
    const url = "http://localhost:8080/auth/signup";
    const accountData = { ...users, role: isAdmin ? "admin" : "user" };
    if (isAdmin) accountData.secretKey = secretKey;
    console.log(accountData);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountData),
        credentials: "include",
      });
      const result = await response.json();
      const { message, success, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate(`${result.redirectUrl}`);
        }, 1000);
      } else if (error) {
        console.log("Error: ",error);
        handleError(error.details[0].message || "Account creation failed");
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleSecretKeySubmit = () => {
    setShowSecretKeyDialog(false);
    createAccount();
  };

  return (
    <>
      <div className="flex items-center justify-center mt-8 mb-8">
        <div className="bg-blue-100 shadow-lg shadow-slate-400 rounded-lg border border-gray-300 p-16 w-1/3">
          <div className="text-3xl text-center">
            <p className="pb-1 font-bold">Sign Up</p>
            <p className="pb-1 font-medium">To</p>
            <div>
              <Logo />
            </div>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="mb-1">
              <label className="block text-gray-700">Sign up as :</label>
              <div className="flex justify-start">
                <button
                  type="button"
                  className={`px-4 py-2 rounded transition-transform duration-300 ${
                    isAdmin ? "bg-gray-300 text-black" : "bg-blue-700 text-white"
                  } ${!isAdmin ? "hover:scale-105" : ""}`}
                  onClick={() => setIsAdmin(false)}
                >
                  User
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded transition-transform duration-300 ${
                    isAdmin ? "bg-blue-700 text-white" : "bg-gray-300 text-black"
                  } ${isAdmin ? "hover:scale-105" : ""}`}
                  onClick={() => setIsAdmin(true)}
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Name :</label>
              <input
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={users.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email :</label>
              <input
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={users.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password :</label>
              <input
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={users.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password :</label>
              <input
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={users.confirmPassword}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg shadow-lg shadow-blue-700/60 hover:opacity-90"
            >
              Create Account
            </button>
          </form>

          <h4 className="text-xs text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </h4>
        </div>
      </div>

      {/* Secret Key Dialog */}
      {showSecretKeyDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold mb-2">Enter Admin Secret Key</h2>
            <input
              type="password"
              className="w-full p-2 border rounded mb-4"
              placeholder="Secret Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowSecretKeyDialog(false)}
                className="mr-2 p-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSecretKeySubmit}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

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
      />
    </>
  );
}

export default Signup;
