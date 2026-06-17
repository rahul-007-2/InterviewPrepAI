import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, LineChart, MessageSquareText, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await API.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-layout">
      <section className="auth-visual">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <h1>
            Practice interviews with your <span className="gradient-text">AI coach.</span>
          </h1>

          <p>
            Get instant scoring, personalized feedback, and track your progress with a premium interview preparation dashboard.
          </p>

          <div className="feature-row">
            <div className="feature-tile">
              <MessageSquareText size={26} />
              <h3>Smart Feedback</h3>
              <p>Improve every answer with guided suggestions.</p>
            </div>

            <div className="feature-tile">
              <LineChart size={26} />
              <h3>Track Growth</h3>
              <p>Monitor scores and performance history.</p>
            </div>

            <div className="feature-tile">
              <ShieldCheck size={26} />
              <h3>Secure Auth</h3>
              <p>JWT powered login and protected APIs.</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="auth-panel">
        <motion.div className="auth-card" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="badge">AI Interview Coach</div>

          <h2>Welcome back</h2>
          <p className="subtitle">Login to continue your preparation journey.</p>

          {message && <div className="alert error">{message}</div>}

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button className="primary-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="switch-text">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}

export default Login;
