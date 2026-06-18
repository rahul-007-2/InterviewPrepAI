import { Bell, Brain, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropdown";

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="nav-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>

        <div className="brand" onClick={() => navigate("/dashboard")}>
          <div className="brand-icon">
            <Brain size={20} />
          </div>

          <span>
            InterviewPrep<span className="brand-ai">AI</span>
          </span>
        </div>
      </div>

      <div className="nav-right">
        <button className="notification-btn">
          <Bell size={18} />
        </button>

        <UserDropdown />
      </div>
    </header>
  );
}

export default Navbar;
