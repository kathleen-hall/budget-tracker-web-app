// Importing Mongoose
const mongoose = require("mongoose");
// Structure for a transaction
const transactionSchema = new mongoose.Schema({
  type: String,
  description: String,
  amount: Number,
  date: String
});

// Model from that transaction structure
const Transaction = mongoose.model("Transaction", transactionSchema);

// Exporting it so server.js can use it
module.exports = Transaction;

