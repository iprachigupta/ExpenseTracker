import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/toast";
import { useEffect } from "react";

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

    useEffect(() => {
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

      handleLogout();
    }, [navigate]);

      return (
        <>
        
        </>
      )
};

export default Logout;

