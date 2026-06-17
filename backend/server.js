require("dotenv").config();
const interviewRoutes = require("./routes/interviewRoutes");

const questionRoutes = require("./routes/questionRoutes");

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const app = express();

const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date(),
  });
});

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get(
  "/api/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Protected route working",
      user: req.user,
    });
  }
);

app.use("/api/user", userRoutes);

app.use("/api/questions", questionRoutes);

app.use("/api/interview", interviewRoutes);

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running");
});

