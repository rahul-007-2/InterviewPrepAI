import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to={isLoggedIn ? "/dashboard" : "/login"} className="brand">
        <div className="brand-icon">
          <Brain size={22} />
        </div>
        <span>
          InterviewPrep<span>AI</span>
        </span>
      </Link>

      {isLoggedIn && (
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      )}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="app-frame">
          <Navbar />

          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
