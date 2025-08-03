// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
const authRouter = require("./routes/auth"); //

const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

// Mount routes
app.use("/api/auth", authRouter);

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("MongoDB connection established successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
