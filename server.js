const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const courseRoutes = require("./routes/courseRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();

/* -------------------- DATABASE -------------------- */

connectDB();

/* -------------------- CORS -------------------- */

app.use(cors());

/* -------------------- BODY PARSER -------------------- */

app.use(express.json());

/* -------------------- TEST ROUTE -------------------- */

app.get("/", (req, res) => {
  res.json({
    message: "Projenius backend is running"
  });
});

/* -------------------- API ROUTES -------------------- */

app.use("/api/courses", courseRoutes);
app.use("/api/news", newsRoutes);

/* -------------------- 404 -------------------- */

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

/* -------------------- SERVER -------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});