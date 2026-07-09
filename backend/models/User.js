// Importing Mongoose
const mongoose = require("mongoose");
// Describes infor each user of app will have
const userSchema = new mongoose.Schema({
  email: String,
    password: String
});

// Creates User model
const User = mongoose.model("User", userSchema);

// Makes user model available in other files
module.exports = User;

