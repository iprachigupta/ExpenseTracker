/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  
  useEffect(() => {
    axios.get('http://localhost:8080/auth/refresh-token', { withCredentials: true })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
