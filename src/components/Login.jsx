
import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // For simplicity, using localStorage to simulate login, this can be replaced with API calls.
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (email === savedEmail && password === savedPassword) {
      // Successful login
      navigate("/dashboard");  // Assume you have a Dashboard component to redirect to
    } else {
      // Invalid credentials
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-300 p-11 rounded-lg shadow-lg shadow-gray-500/60 max-w-md w-full">
      <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-left text-gray-900 mb-2">Email :</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-gray-900 mb-2">Password :</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg shadow-lg shadow-blue-700/60 hover:opacity-90"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm">
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
