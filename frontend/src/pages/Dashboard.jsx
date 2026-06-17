import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
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

function Dashboard() {
  const navigate = useNavigate();
  const hour = new Date().getHours();

  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 17) greeting = "Good afternoon";

  return (
    <main className="dashboard-layout">
      <aside className="sidebar">
        <div className="side-menu">
          <div className="side-link active">
            <BarChart3 size={20} />
            Dashboard
          </div>

          <div className="side-link" onClick={() => navigate("/interview")}>
            <Play size={20} />
            Start Interview
          </div>

          <div className="side-link" onClick={() => navigate("/history")}>
            <History size={20} />
            History
          </div>

          <div className="side-link">
            <BookOpen size={20} />
            Question Bank
          </div>
        </div>

        <div className="side-note">
          <Sparkles size={26} />
          <h3>Daily Tip</h3>
          <p>Use specific project examples when answering interview questions.</p>
        </div>
      </aside>

      <section className="main-content">
        <motion.div className="dashboard-hero" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <div className="dashboard-badge">
            {greeting}, Rahul 👋
          </div>

          <h1>
            Ready to sharpen your <span className="gradient-text">interview skills?</span>
          </h1>

          <p>
            Start a mock interview, receive AI-powered feedback, and track your performance over time.
          </p>
        </motion.div>

        <div className="action-grid">
          <motion.div className="action-card" whileHover={{ y: -6 }} onClick={() => navigate("/interview")}>
            <div className="icon-bubble purple">
              <Brain size={30} />
            </div>
            <h3>Start Interview</h3>
            <p>Begin an AI-powered mock interview with random questions.</p>
          </motion.div>

          <motion.div className="action-card" whileHover={{ y: -6 }} onClick={() => navigate("/history")}>
            <div className="icon-bubble blue">
              <History size={30} />
            </div>
            <h3>View History</h3>
            <p>Review your previous attempts, scores, and feedback.</p>
          </motion.div>

          <motion.div className="action-card" whileHover={{ y: -6 }}>
            <div className="icon-bubble green">
              <MessageSquareText size={30} />
            </div>
            <h3>AI Feedback</h3>
            <p>Understand what was good and what needs improvement.</p>
          </motion.div>
        </div>

        <section className="overview-card">
          <h3>Performance Overview</h3>

          <div className="metrics">
            <div className="metric">
              <div className="icon-bubble blue">
                <Target size={24} />
              </div>
              <div>
                <span className="metric-value">5</span>
                <span className="metric-label">Questions</span>
              </div>
            </div>

            <div className="metric">
              <div className="icon-bubble green">
                <Trophy size={24} />
              </div>
              <div>
                <span className="metric-value">7/10</span>
                <span className="metric-label">Latest Score</span>
              </div>
            </div>

            <div className="metric">
              <div className="icon-bubble purple">
                <Clock3 size={24} />
              </div>
              <div>
                <span className="metric-value">Live</span>
                <span className="metric-label">AI Evaluation</span>
              </div>
            </div>

            <div className="metric">
              <div className="icon-bubble orange">
                <BarChart3 size={24} />
              </div>
              <div>
                <span className="metric-value">MVP</span>
                <span className="metric-label">Backend Ready</span>
              </div>
            </div>
          </div>
        </section>

        <section className="quote-card">
          <div>
            <div className="quote-mark">“</div>
            <p>
              The best way to prepare for interviews is to practice answering clearly, repeatedly, and with feedback.
            </p>
          </div>
          <Sparkles size={40} />
        </section>
      </section>
    </main>
  );
}

export default Dashboard;
