const pool = require("../config/db");

exports.getQuestions = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM questions ORDER BY id"
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM questions WHERE id=$1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Question not found"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};
