import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/toast";
import { useEffect, useState } from "react";

const callLogoutApi = async () => {
    const url = "http://localhost:8080/auth/logout";
        const response = await fetch(url, {
          method: "post",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: "include",
        });
        return await response.json();
  }

const Logout = () => {
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(true);

    const handleLogout = async () => {
      const result = await callLogoutApi(); 
      if(result.success){
        handleSuccess(result.message); 
      }else {
        handleError(result.error);
      }
      setTimeout(() => {
        navigate("/login"); 
      }, 500); 
    };
    
    useEffect(() => {
      
    });

    const handleConfirmLogout = () => {
      setShowDialog(false); 
      handleLogout();      
    };

    const handleCancelLogout = () => {
      setShowDialog(false);
      setTimeout(() => {
        navigate("/dashboard"); 
      }, 200); 
    };

      return (
        <div>
        {showDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-full max-w-md text-center">
              <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
              <p className="mb-4">Are you sure you want to log out?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:scale-110 hover:bg-red-700" 
                >
                  Yes, Logout
                </button>
                <button
                  onClick={handleCancelLogout}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:scale-110 hover:bg-gray-500 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      )
};

export default Logout;

