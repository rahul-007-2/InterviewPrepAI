import { useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function UserDropdown() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="user-dropdown">
      <button className="user-trigger" onClick={() => setOpen(!open)}>
        <div className="avatar">{initials}</div>

        <div className="user-meta">
          <span>{user?.name || "User"}</span>
          <small>{user?.email}</small>
        </div>
      </button>

      {open && (
        <div className="dropdown-menu">
          <button onClick={() => navigate("/profile")}>
            <User size={16} />
            Profile
          </button>

          <button>
            <Settings size={16} />
            Settings
          </button>

          <button className="danger-text" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
