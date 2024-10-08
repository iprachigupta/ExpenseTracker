// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";  // Assuming this is your Signup component
import Login from "./components/Login";
// import Dashboard from "./components/Dashboard"; // Create this or just redirect
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
