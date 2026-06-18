import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import API from "../api/axios";

function QuestionBank() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    API.get("/api/questions")
      .then((res) => setQuestions(res.data))
      .catch(() => setQuestions([]));
  }, []);

  return (
    <AppLayout active="questions">
      <div className="page-card">
        <div className="badge">Question Bank</div>
        <h2>Practice Questions</h2>
        <p className="subtitle">Browse all questions currently available in the system.</p>

        {questions.map((q) => (
          <div className="history-item" key={q.id}>
            <h3>{q.title}</h3>
            <p>{q.category} • {q.difficulty}</p>
            <p className="subtitle">{q.answer}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}

export default QuestionBank;
