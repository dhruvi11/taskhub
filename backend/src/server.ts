import express from "express";

const app = express();

app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskHub API is healthy",
  });
});

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});