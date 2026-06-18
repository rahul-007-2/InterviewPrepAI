import { Mail, ShieldCheck, User, BadgeCheck } from "lucide-react";
import AppLayout from "../components/AppLayout";
import useAuth from "../hooks/useAuth";

function makeProfileId(id) {
  const base = Number(id || 0).toString(16).toUpperCase().padStart(4, "0");
  return `IPA-${base}A7${String(id || 0).padStart(2, "0")}`.slice(0, 12);
}

function Profile() {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <AppLayout active="profile">
      <div className="profile-wrapper">
        <div className="profile-hero">
          <div className="profile-avatar">{initials}</div>

          <div>
            <p className="badge">Candidate Profile</p>
            <h1>{user?.name || "User"}</h1>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-card">
            <User size={22} />
            <span>Name</span>
            <strong>{user?.name}</strong>
          </div>

          <div className="profile-card">
            <Mail size={22} />
            <span>Email</span>
            <strong>{user?.email}</strong>
          </div>

          <div className="profile-card">
            <BadgeCheck size={22} />
            <span>Profile ID</span>
            <strong>{makeProfileId(user?.id)}</strong>
          </div>

          <div className="profile-card">
            <ShieldCheck size={22} />
            <span>Role</span>
            <strong>Candidate</strong>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Profile;
