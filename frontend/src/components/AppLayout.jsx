import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AppLayout({ active, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Navbar toggleSidebar={() => setMobileOpen(true)} />

      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <main className={`dashboard-layout ${collapsed ? "layout-collapsed" : ""}`}>
        <div className={`mobile-sidebar ${mobileOpen ? "open" : ""}`}>
          <Sidebar
            active={active}
            collapsed={false}
            setCollapsed={setCollapsed}
            closeMobile={() => setMobileOpen(false)}
          />
        </div>

        <div className="desktop-sidebar">
          <Sidebar
            active={active}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </div>

        <section className="main-content">{children}</section>
      </main>
    </>
  );
}

export default AppLayout;
