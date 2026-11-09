const mongoose = require('mongoose');

// 1. Schema define karo
const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["Income", "Expense"],
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

// 2. Model export karo
module.exports = mongoose.model("Transaction", transactionSchema);