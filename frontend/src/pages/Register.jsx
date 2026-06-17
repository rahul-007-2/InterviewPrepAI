import { useState } from "react";
import { Link } from "react-router-dom";
import { Brain, Sparkles, Trophy, Target } from "lucide-react";
import { motion } from "framer-motion";
import API from "../api/axios";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await API.post("/api/auth/register", form);
      setSuccess(true);
      setMessage(`Account created for ${res.data.email}`);
    } catch (err) {
      setSuccess(false);
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-layout">
      <section className="auth-visual">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <h1>
            Build confidence before your <span className="gradient-text">next interview.</span>
          </h1>

          <p>
            Practice HR, technical, React, cloud, and database questions with AI-based scoring and feedback.
          </p>

          <div className="feature-row">
            <div className="feature-tile">
              <Sparkles size={26} />
              <h3>AI Scoring</h3>
              <p>Get instant answer evaluation.</p>
            </div>

            <div className="feature-tile">
              <Target size={26} />
              <h3>Focused Practice</h3>
              <p>Improve topic by topic.</p>
            </div>

            <div className="feature-tile">
              <Trophy size={26} />
              <h3>Portfolio Ready</h3>
              <p>A complete SaaS-style project.</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="auth-panel">
        <motion.div className="auth-card" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="badge">Start Free</div>

          <h2>Create account</h2>
          <p className="subtitle">Start practicing with your AI interview coach.</p>

          {message && (
            <div className={`alert ${success ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                placeholder="Rahul"
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

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
                placeholder="Minimum 6 characters"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button className="primary-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="switch-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}

export default Register;
