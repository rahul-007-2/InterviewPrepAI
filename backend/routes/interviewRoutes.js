const express = require("express");
const router = express.Router();

const {
  startInterview,
  submitAnswer,
  getHistory
} = require("../controllers/interviewController");

const auth = require("../middleware/authMiddleware");

router.post("/start", auth, startInterview);
router.post("/answer", auth, submitAnswer);
router.get("/history", auth, getHistory);

module.exports = router;
