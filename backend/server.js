
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const transaction = require("./models/transaction")


const PORT = 5000;


// Middleware: incoming JSON data ko parse karta hai

app.use(express.json());
app.use(cors());

// GET route: backend check karne ke liye
app.get("/", (req, res) => {
  res.send("FinanceFlow Backend is running!");
});

// GET route: MongoDB se transactions fetch karne ke liye
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch transactions",
      error: error.message
    });
  }
});

// POST route: MongoDB mein transaction save karne ke liye
app.post("/api/transactions", async (req, res) => {
  try {
    const newTransaction = await transaction.create(req.body);

    res.status(201).json({
      message: "Transaction saved successfully!",
      data: newTransaction
    });
  } catch (error) {
    res.status(400).json({
      message: "Transaction could not be saved",
      error: error.message
    });
  }
});

// Server start
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);

    })

  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
  }
};

startServer()