/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/toast";
import { useLogout } from "../contexts/LogoutContext";

const callLogoutApi = async () => {
  const url = "http://localhost:8080/auth/logout";
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return await response.json();
};

const Logout = () => {
  const { showLogoutDialog, closeLogoutDialog } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await callLogoutApi();
    if (result.success) {
      handleSuccess(result.message);
      closeLogoutDialog();
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } else {
      handleError(result.error);
    }
  };

  return (
    <div>
      {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-full max-w-md text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:scale-110 hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={closeLogoutDialog}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:scale-110 hover:bg-gray-500 hover:text-white"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
