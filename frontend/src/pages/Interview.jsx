import { useState } from "react";
import AppLayout from "../components/AppLayout";
import API from "../api/axios";

function Interview() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    setLoading(true);
    const res = await API.post("/api/interview/start");
    setQuestions(res.data);
    setCurrent(0);
    setAnswer("");
    setResult(null);
    setLoading(false);
  };

  const submitAnswer = async () => {
    setLoading(true);
    const res = await API.post("/api/interview/answer", {
      questionId: questions[current].id,
      answer,
    });
    setResult(res.data.attempt);
    setLoading(false);
  };

  const nextQuestion = () => {
    setCurrent(current + 1);
    setAnswer("");
    setResult(null);
  };

  return (
    <AppLayout active="interview">
      <div className="page-card">
        <div className="badge">Mock Interview</div>
        <h2>AI Interview Practice</h2>
        <p className="subtitle">Answer questions and receive instant AI feedback.</p>

        {questions.length === 0 ? (
          <button className="primary-btn" onClick={startInterview} disabled={loading}>
            {loading ? "Starting..." : "Start Interview"}
          </button>
        ) : (
          <div className="question-card">
            <p className="subtitle">Question {current + 1} of {questions.length}</p>
            <h2>{questions[current].title}</h2>
            <p>{questions[current].category} • {questions[current].difficulty}</p>

            <div className="form-group">
              <label>Your Answer</label>
              <textarea
                rows="7"
                value={answer}
                placeholder="Type your interview answer..."
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>

            <button className="primary-btn" onClick={submitAnswer} disabled={loading || !answer}>
              {loading ? "Evaluating..." : "Submit Answer"}
            </button>

            {result && (
              <div className="result-box">
                <h3>Score: {result.score}/10</h3>
                <p>{result.feedback}</p>

                {current < questions.length - 1 ? (
                  <button className="primary-btn" onClick={nextQuestion}>
                    Next Question
                  </button>
                ) : (
                  <p><strong>Interview completed.</strong></p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default Interview;
