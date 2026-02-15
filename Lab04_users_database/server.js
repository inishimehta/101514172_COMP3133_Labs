require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8081;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

app.post("/users", async (req, res) => {
  try {
    const created = await User.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        error: "ValidationError",
        details: Object.values(err.errors).map((e) => e.message)
      });
    }

    if (err && err.code === 11000) {
      return res.status(400).json({
        error: "DuplicateKey",
        details: ["email must be unique"]
      });
    }

    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
