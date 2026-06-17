const pool = require("../config/db");
const axios = require("axios");

exports.startInterview = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM questions ORDER BY RANDOM() LIMIT 5"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.submitAnswer = async (req, res) => {
  try {
    const { questionId, answer } = req.body;

    if (!questionId || !answer) {
      return res.status(400).json({
        message: "questionId and answer are required",
      });
    }

    const questionResult = await pool.query(
      "SELECT * FROM questions WHERE id = $1",
      [questionId]
    );

    if (questionResult.rows.length === 0) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const question = questionResult.rows[0];

    let evaluation = {
      score: 5,
      feedback: "Local AI fallback score used.",
    };

    try {
      const prompt = `
You are grading an interview answer.

Give ONLY this JSON object. No markdown. No code. No explanation.

{
  "score": 7,
  "feedback": "one short sentence"
}

Question: ${question.title}
Expected Answer: ${question.answer}
Candidate Answer: ${answer}
`;

      const aiResult = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: "qwen2.5:0.5b",
          prompt,
          stream: false,
        },
        {
          timeout: 60000,
        }
      );

      let text = aiResult.data.response || "";

      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const jsonMatch = text.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        evaluation = {
          score: Number(parsed.score) || 5,
          feedback: parsed.feedback || "No feedback provided.",
        };
      } else {
        evaluation = {
          score: 6,
          feedback: text.slice(0, 200) || "Local AI generated no feedback.",
        };
      }
    } catch (aiError) {
      console.log("Ollama evaluation failed:");
      console.log(aiError.message);
    }

    const result = await pool.query(
      `
      INSERT INTO attempts
      (user_id, question_id, answer, score, feedback)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        req.user.id,
        questionId,
        answer,
        evaluation.score,
        evaluation.feedback,
      ]
    );

    res.json({
      message: "Answer evaluated and saved",
      attempt: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
      attempts.id,
      questions.title,
      attempts.answer,
      attempts.score,
      attempts.feedback,
      attempts.created_at
      FROM attempts
      JOIN questions
      ON questions.id = attempts.question_id
      WHERE attempts.user_id = $1
      ORDER BY attempts.created_at DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
