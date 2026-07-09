// Imports Express
const express = require("express");
const Transaction = require("./models/Transaction");
const User = require("./models/User");

// Imports CORS
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Creates Express server
const app = express();

// Allows frontend to connect to  backend + read JSON data
app.use(cors());
app.use(express.json());

        // TEST ROUTE
        /*app.get("/", function (request, response) {
        response.send("Budget Tracker backend is running");
        });

        */
 mongoose
 .connect(process.env.MONGO_URI)
 .then(function () {
   console.log("Connected to MongoDB");
        })
        .catch(function (error) {
            console.log("MongoDB connection error:", error.message);
        });
        

// POST 
  // Creates a route for adding a new transaction
  
app.post("/api/transactions", async function (request, response) {

  // Uses the data sent from the frontend to create a transaction
  const transaction = new Transaction(request.body);

  // Saves the transaction in the MongoDB database
  await transaction.save();

  // Sends the saved transaction back to the frontend
  response.json(transaction);
});


  
//GET 
// Gets all saved transactions from the database
app.get("/api/transactions", async function (request, response) {
  const transactions = await Transaction.find();

  response.json(transactions );
});

// DELETE 
// Deletes one transaction from the database
app.delete("/api/transactions/:id", async function (request, response) {

  await Transaction.findByIdAndDelete(request.params.id);

  response.json({ message: "Transaction deleted" });

});
  

// CURRENCY CONVERTER 
// Gets the exchange rate and converts the amount
app.get("/api/convert", async function (request, response) {

  // Gets the information sent from the frontend
  const amount = request.query.amount;
  const fromCurrency = request.query.from;
  const toCurrency = request.query.to;

  // Creates the API address
  const apiUrl =
    "https://api.frankfurter.dev/v1/latest?base=" +
    fromCurrency +
    "&symbols=" +
    toCurrency;

  // Sends a request to the currency API
  const apiResponse = await fetch(apiUrl);

  // Changes the API response into JavaScript data
  const currencyData = await apiResponse.json();

  // Gets the exchange rate
  const exchangeRate = currencyData.rates[toCurrency];

  // Calculates converted amount
  const convertedAmount = amount * exchangeRate;

  // Sends the converted amount back to the frontend
  response.json({
    result: convertedAmount
  });
});

// SIGN-UP ROUTE
// Creates a new user account
app.post("/api/signup", async function (request, response) {
  const user = new User({
    email: request.body.email,
    password: request.body.password
  });

  await user.save();

  response.json({ message: "Account created" });
});

// LOGIN ROUTE
// Checks if the email and password match a saved user
app.post("/api/login", async function (request, response) {
  const user = await User.findOne({
    email: request.body.email,
    password: request.body.password
  });
  if (user) {
    response.json({ success: true });
  } else {
    response.json({ success: false });
  }
});

app.listen(5000, "127.0.0.1", function () {
  console.log("Server is running at   http://127.0.0.1:5000");
});