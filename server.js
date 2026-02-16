const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Import DB connection
const connectDB = require("./src/config/db");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());               // Allow frontend connection
app.use(express.json());       // Parse JSON body

// Routes
app.use("/api/users", require("./src/routes/userRoutes"));

// Default route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
