import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import API from "../api/axios";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get("/api/interview/history")
      .then((res) => setHistory(res.data))
      .catch(() => setHistory([]));
  }, []);

  return (
    <AppLayout active="history">
      <div className="page-card">
        <div className="badge">Progress</div>
        <h2>Interview History</h2>
        <p className="subtitle">Review your previous answers, scores and feedback.</p>

        {history.length === 0 ? (
          <p>No attempts yet.</p>
        ) : (
          history.map((item) => (
            <div className="history-item" key={item.id}>
              <h3>{item.title}</h3>
              <p><strong>Score:</strong> {item.score}/10</p>
              <p><strong>Your Answer:</strong> {item.answer}</p>
              <p><strong>Feedback:</strong> {item.feedback}</p>
              <p className="subtitle">{new Date(item.created_at).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </AppLayout>
  );
}

export default History;
