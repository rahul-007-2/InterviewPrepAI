import {
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  History,
  Mic,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar({ active, collapsed, setCollapsed, closeMobile }) {
  const navigate = useNavigate();

  const links = [
    { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { id: "interview", label: "Interview", path: "/interview", icon: Mic },
    { id: "history", label: "History", path: "/history", icon: History },
    { id: "questions", label: "Question Bank", path: "/questions", icon: BookOpen },
  ];

  const go = (path) => {
    navigate(path);
    if (closeMobile) closeMobile();
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div>
        <div className="sidebar-top">
          {!collapsed && <p className="sidebar-label">Workspace</p>}

          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <div className="side-menu">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`side-link ${active === item.id ? "active" : ""}`}
                onClick={() => go(item.path)}
              >
                <Icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {!collapsed && (
        <div className="side-note">
          <Sparkles size={24} />
          <h3>Daily Tip</h3>
          <p>
            Strong answers include specific projects, clear impact, and what you learned.
          </p>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
