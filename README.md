# Budget Tracker Web App

## Project Description

This project is a budget tracker web application that helps users track and view their monthly expenses, view spending insights, and convert currencies. Users can track their income and expenses, view their monthly summarized balances, convert currencies with live conversion rates, and view spending insights from the last 6 months. All the data from the project is saved in an online MongoDB database.  

## Application Features

- User Sign up
- User Login
- Add income
- Add expenses
- View monthly totals for income, expenses, and balance 
- View monthly transaction history, 
- Delete transactions
- Convery currencies
- View expense insights from the last 6 months

## Technologies Used

Frontend:
- HTML
- CSS
- JavaScript

Backend:
- Node.js
- Express
- MongoDB
- Mongoose

API:
- Frankfurter API

## How to Set up and Run the Project

1. Download or clone the project repo from GitHub

2. Open the backend folder using the terminal window

3. Install the backend packages using the terminal command: `npm install`

4. Create a `.env` file inside the backend folder

5. Copy the MongoDB connection string from the PowerPoint presentation and paste it into the `.env` file in this format:

   `MONGO_URI=your_mongodb_connection_string`

6. Start the backend server by running the terminal command: `node server.js`

7. Open the `index.html` file found inside the frontend folder

8. Sign up, log in, and use the dashboard


## Environment Variables

This project uses an `.env` file to store the MongoDB connection string.

The `.env` file should be created inside the backend folder and should contain:

`MONGO_URI=your_mongodb_connection_string`

For marking purposes, the actual MongoDB connection string is in the PowerPoint presentation.

## Project Structure

- `frontend` contains the HTML, CSS, images, and frontend JavaScript files

- `backend` contains the Express server, API route, database connection, and backend files

- `models` contains the MongoDB schemas for users and transactions

- `README.md` explains how the project works and how to run it

- `.env.example` shows the environment variable format needed for the database connection

## Author 

Kathleen Hall














