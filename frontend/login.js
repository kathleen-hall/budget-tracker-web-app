// Finds login form
const loginForm = document.getElementById("login-form");

// Runs when Login button is pressed
loginForm.addEventListener("submit", async function (event) {

  // Stops page from refreshing
  event.preventDefault();

  // Gets email and password entered by the user
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Sends  login details to backend
  const response = await fetch("http://127.0.0.1:5000/api/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });

  const data = await response.json();

  // Opens dashboard when login is correct
  if (data.success === true) {
    window.location.href = "dashboard.html";
  }
});