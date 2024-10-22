// eslint-disable-next-line no-unused-vars
import React from "react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess,} from "../utils/toast";
import Logo from "../components/Logo";

function Signup() {
  const [users, setUsers] = useState({
    name: "",
    email:"",
    password:"",
    confirmPassword: "",
  })

  const navigate = useNavigate();
  const handleInputChange = (event)=>{
    setUsers((prev)=>({...prev, [event.target.name]:event.target.value}))
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const {name, email, password, confirmPassword} = users;
    if(!name|| !email || !password || !confirmPassword)
      return handleError("All Fields Are Required");
    try{
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(users),
        credentials:"include",
      });
      const result = await response.json();
      const {message, success, error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/dashboard');
        },1000)
      }else if(!success){
        handleError(message);
      }else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }
    }catch(error){
      handleError(error)
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-blue-100 shadow-lg shadow-slate-400 rounded-lg border border-gray-300 p-8 w-96">
          <div className="text-3xl text-center">
            <p className='pb-1 font-bold'>Sign Up</p>
            <p className='pb-1 font-medium'>To</p>
            <div><Logo/></div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name :</label>
              <input
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                type="text"
                name="name"
                placeholder="Enter the name"
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
                placeholder="Enter the email"
                
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
                placeholder="Enter the password"
                
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
                placeholder="Enter the password again"
                
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
            <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </h4>
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

export default Signup;
