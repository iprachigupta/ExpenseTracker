import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import Transactions from "./screens/Transactions";
import Account from "./screens/Account";
import Logout from "./screens/Logout";
import ChangePass from "./screens/ChangePass";
import DeleteAccount from "./screens/DeleteAccount";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePass />
              </ProtectedRoute>
            }
          />
          <Route
            path="/delete-account"
            element={
              <ProtectedRoute>
                <DeleteAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
