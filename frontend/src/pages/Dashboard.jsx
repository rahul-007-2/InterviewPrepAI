import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Brain,
  Clock3,
  History,
  MessageSquareText,
  Play,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from "../components/AppLayout";
import useAuth from "../hooks/useAuth";
import API from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/api/interview/history");
        setHistory(res.data);
      } catch {
        setHistory([]);
      }
    };

    fetchHistory();
  }, []);

  const hour = new Date().getHours();
  let greeting = "Good evening";

  if (hour < 12) greeting = "Good morning";
  else if (hour < 17) greeting = "Good afternoon";

  const latestScore = history.length > 0 ? `${history[0].score}/10` : "—";
  const attempts = history.length;
  const avgScore =
    history.length > 0
      ? Math.round(
          history.reduce((sum, item) => sum + Number(item.score || 0), 0) /
            history.length
        )
      : 0;

  return (
    <AppLayout active="dashboard">
      <motion.div
        className="dashboard-hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="dashboard-badge">
          {greeting}, {user?.name || "there"} 👋
        </div>

        <h1>
          Ready to sharpen your{" "}
          <span className="gradient-text">interview skills?</span>
        </h1>

        <p>
          Start a mock interview, receive AI-powered feedback, and track your
          performance over time.
        </p>
      </motion.div>

      <div className="glow-divider" />

      <section className="stats-row">
        <div className="stat-large">
          <div className="icon-bubble blue">
            <Target size={24} />
          </div>
          <div>
            <strong>{attempts}</strong>
            <span>Total Attempts</span>
          </div>
        </div>

        <div className="stat-large">
          <div className="icon-bubble green">
            <Trophy size={24} />
          </div>
          <div>
            <strong>{latestScore}</strong>
            <span>Latest Score</span>
          </div>
        </div>

        <div className="stat-large">
          <div className="icon-bubble purple">
            <BarChart3 size={24} />
          </div>
          <div>
            <strong>{avgScore || "—"}</strong>
            <span>Average Score</span>
          </div>
        </div>
      </section>

      <section className="action-panel">
        <div className="bot-visual" />

        <div>
          <h2>Your AI interview coach is ready</h2>
          <p>
            Practice with real interview questions, submit your answer, and get
            instant scoring with feedback.
          </p>

          <div className="action-buttons">
            <button
              className="action-btn"
              onClick={() => navigate("/interview")}
            >
              <Play size={20} />
              Start Interview
            </button>

            <button
              className="action-btn secondary"
              onClick={() => navigate("/history")}
            >
              <History size={20} />
              View History
            </button>
          </div>
        </div>
      </section>

      <section className="quote-card">
        <div>
          <div className="quote-mark">“</div>
          <p>
            The best way to prepare for interviews is to practice answering
            clearly, repeatedly, and with feedback.
          </p>
        </div>
        <Sparkles size={40} />
      </section>

      <section className="stats-row" style={{ marginTop: "24px" }}>
        <div className="stat-large">
          <div className="icon-bubble purple">
            <Brain size={24} />
          </div>
          <div>
            <strong>AI</strong>
            <span>Local Evaluation</span>
          </div>
        </div>

        <div className="stat-large">
          <div className="icon-bubble blue">
            <MessageSquareText size={24} />
          </div>
          <div>
            <strong>Live</strong>
            <span>Feedback Engine</span>
          </div>
        </div>

        <div className="stat-large">
          <div className="icon-bubble orange">
            <Clock3 size={24} />
          </div>
          <div>
            <strong>24/7</strong>
            <span>Practice Anytime</span>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

export default Dashboard;
