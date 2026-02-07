require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000; // common Express pattern [web:27]

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

/**
 * (4) GET /restaurants
 * - Return all restaurant details (all columns)
 *
 * (6) GET /restaurants?sortBy=ASC|DESC
 * - Return only: id, cuisines, name, city, restaurant_id
 * - Sort by restaurant_id ASC or DESC
 */
app.get("/restaurants", async (req, res) => {
  try {
    const { sortBy } = req.query;

    // (6)
    if (sortBy === "ASC" || sortBy === "DESC") {
      const sortDir = sortBy === "ASC" ? 1 : -1;

      const docs = await Restaurant.find(
        {},
        { _id: 1, cuisine: 1, name: 1, "address.city": 1, restaurant_id: 1 }
      ).sort({ restaurant_id: sortDir });

      return res.json(docs);
    }

    // (4)
    const docs = await Restaurant.find({});
    return res.json(docs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * (5) GET /restaurants/cuisine/:cuisine
 * - Return all restaurant details by cuisine (all columns)
 */
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  try {
    const { cuisine } = req.params;
    const docs = await Restaurant.find({ cuisine });
    return res.json(docs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * (7) GET /restaurants/Delicatessen
 * - cuisine == Delicatessen AND city != Brooklyn
 * - Select cuisines, name, city; exclude id
 * - Sort by name ASC
 *
 * Note: MongoDB projection allows excluding _id while including other fields. [web:5]
 */
app.get("/restaurants/Delicatessen", async (req, res) => {
  try {
    const docs = await Restaurant.find(
      { cuisine: "Delicatessen", "address.city": { $ne: "Brooklyn" } },
      { _id: 0, cuisine: 1, name: 1, "address.city": 1 }
    ).sort({ name: 1 });

    return res.json(docs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
