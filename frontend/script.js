// Finds the Add Transaction button
const addTransactionButton =
  document.getElementById("add-transaction-button");

// Stores the transactions loaded from database
let transactions = [];

// Runs when the Add Transaction button is clicked
//addTransactionButton.addEventListener("click", function () {
  addTransactionButton.addEventListener("click", async function () {const type =
    document.getElementById("transaction-type").value;

  const description =
    document.getElementById("transaction-description").value;

  const amount =
    document.getElementById("transaction-amount").value;

  const date =
    document.getElementById("transaction-date").value;

  // Stops transaction from being added if fields are empty
  if (description === "" || amount === "" || date === "") {
    return;
  }

  // Creates one transaction object
  const transaction = {
    type: type,
    description: description,
    amount: Number(amount),
    date: date
  };

  // Adds the transaction to the array
 // transactions.push(transaction);
  /*
Old temporary method.

This only added the transaction to the array.
It did not save it to the database.

transactions.push(transaction);
*/

// Sends transaction to the backend

await fetch("http://127.0.0.1:5000/api/transactions", {
  method: "POST",

  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(transaction)
});

// Loads all transactions again after saving
await loadTransactions();


  // Clears all the form fields
  document.getElementById("transaction-description").value = "";
  document.getElementById("transaction-amount").value = "";
  document.getElementById("transaction-date").value = "";
});

// Loads saved transactions from the backend
async function loadTransactions() {
  const response = await fetch("http://127.0.0.1:5000/api/transactions");

  transactions = await response.json();

  displayTransactions();
  showInsights();
}


// Displays transactions in the history tile
function displayTransactions() {
  const transactionList =
    document.getElementById("transaction-list");

  const selectedMonth =
    document.getElementById("month-filter").value;

  // Keeps only transactions from the selected month
  const filteredTransactions = transactions.filter(function (transaction) {
   return transaction.date && transaction.date.startsWith(selectedMonth);
  });

  // Sorts transactions from newest to oldest
  filteredTransactions.sort(function (firstTransaction, secondTransaction) {
    return new Date(secondTransaction.date) -
      new Date(firstTransaction.date);
  });

  // Clears the old transaction list
  transactionList.innerHTML = "";

  // Shows a message if no transactions match the month
  if (filteredTransactions.length === 0) {
    transactionList.innerHTML =
      "<p>No transactions added for this month.</p>";

    updateOverview(filteredTransactions);
    return;
  }

  // transactions put in each column of table on dashboard page 
  filteredTransactions.forEach(function (transaction) {



const transactionItem = document.createElement("tr");


    transactionItem.innerHTML =
  "<td>" + transaction.date + "</td>" +
  "<td>" + transaction.description + "</td>" +
  "<td>" + transaction.type + "</td>" +
  "<td>R" + transaction.amount.toFixed(2) + "</td>";

const deleteButton = document.createElement("button");

deleteButton.textContent = "Delete";

deleteButton.addEventListener("click", async function () {
  await fetch(
    "http://127.0.0.1:5000/api/transactions/" + transaction._id,
    {
      method: "DELETE"
    }
  );

  await loadTransactions();
});
// delete button moved to own column for each transaction
const deleteCell = document.createElement("td");

deleteCell.appendChild(deleteButton);

transactionItem.appendChild(deleteCell);

    transactionList.appendChild(transactionItem);
  });

  updateOverview(filteredTransactions);
}



// Updates the Overview totals
function updateOverview(filteredTransactions) {
  let totalIncome = 0;
  let totalExpenses = 0;

  filteredTransactions.forEach(function (transaction) {
    if (transaction.type === "income") {
      totalIncome = totalIncome + transaction.amount;
    }

    if (transaction.type === "expense") {
      totalExpenses = totalExpenses + transaction.amount;
    }
  });

  const balance = totalIncome - totalExpenses;

  document.getElementById("total-income").textContent =
    "R" + totalIncome.toFixed(2);

  document.getElementById("total-expenses").textContent =
    "R" + totalExpenses.toFixed(2);

  document.getElementById("total-balance").textContent =
    "R" + balance.toFixed(2);
}
// Calculates the average expenses for the last 6 months
function showInsights() {
  const today = new Date();

  let totalExpensesForSixMonths = 0;
  let highestExpenses = 0;
let highestMonth = "";
let lowestExpenses = null;
let lowestMonth = "";

  // Goes through the current month and the 5 months before it
  for (let i = 0; i < 6; i++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth() - i,
      1
    );

    // Makes a month code such as 2026-07
    const monthCode =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0");

    let monthExpenses = 0;

    // Adds together the expenses for this month
transactions.forEach(function (transaction) {
  if (
    transaction.date &&
    transaction.type === "expense" &&
    transaction.date.startsWith(monthCode)
  ) {
    monthExpenses = monthExpenses + transaction.amount;
  }
});

// Checks if this month has the highest expenses
if (monthExpenses > highestExpenses || highestMonth === "") {
  highestExpenses = monthExpenses;

  highestMonth = date.toLocaleString("en-ZA", {
    month: "long",
    year: "numeric"
  });
}

// Checks if this month has lowest expenses
if (lowestExpenses === null || monthExpenses < lowestExpenses) {
  lowestExpenses = monthExpenses;

  lowestMonth = date.toLocaleString("en-ZA", {
    month: "long",
    year: "numeric"
  });
}

    totalExpensesForSixMonths =
      totalExpensesForSixMonths + monthExpenses;
  }

  const averageExpenses = totalExpensesForSixMonths / 6;

  document.getElementById("average-expenses").textContent =
    "Average monthly expenses: R" +
    averageExpenses.toFixed(2);
    document.getElementById("highest-month").textContent =
  "Highest spending month: " +
  highestMonth +
  " - R" +
  highestExpenses.toFixed(2);

  document.getElementById("lowest-month").textContent =
  "Lowest spending month: " +
  lowestMonth +
  " - R" +
  lowestExpenses.toFixed(2);
}

// Updates the page when another month is selected
document
  .getElementById("month-filter")
  .addEventListener("change", function () {
    displayTransactions();
  });


// Sets the month picker to the current month
const currentDate = new Date();

const currentMonth =
  currentDate.getFullYear() +
  "-" +
  String(currentDate.getMonth() + 1).padStart(2, "0");

document.getElementById("month-filter").value = currentMonth;




loadTransactions();

// Finds the Convert button
const convertButton =
  document.getElementById("convert-button");

// Runs when the Convert button is clicked
convertButton.addEventListener("click", async function () {

  // Gets the values from the converter
  const amount =
    document.getElementById("amount").value;

  const fromCurrency =
    document.getElementById("from-currency").value;

  const toCurrency =
    document.getElementById("to-currency").value;

  // Stops if no amount was entered
  if (amount === "") {
    return;
  }

  // Creates backend address
  const convertUrl =
    "http://127.0.0.1:5000/api/convert?amount=" +
    amount + "&from=" + fromCurrency + "&to=" + toCurrency;

  // Gets  converted amount from the backend
  const response = await fetch(convertUrl);

  const data = await response.json();

  // Shows the result on the page
  document.getElementById("conversion-result").textContent =
  "Converted amount: " + toCurrency + " " + data.result.toFixed(2);
});

