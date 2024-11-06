import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import Transactions from "./screens/Transactions";
import Account from "./screens/Account";
import Logout from "./screens/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./screens/Settings"
import AdminDashboard from "./screens/AdminDashboard";
import UsersManage from "./screens/UsersManage";
import CategoryManage from "./screens/CategoryManage";
import AdminAccount from "./screens/AdminAccount";


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
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/category-manage"
            element={
              <ProtectedRoute>
                <CategoryManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/users-manage"
            element={
              <ProtectedRoute>
                <UsersManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/account"
            element={
              <ProtectedRoute>
                <AdminAccount />
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
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
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
