// Finds sign-up form
const signupForm = document.getElementById("signup-form");

// Runs when Create Account button is pressed
signupForm.addEventListener("submit", async function (event) {

  // Stops  page from refreshing
  event.preventDefault();

  // Gets  information entered by user
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Sends information to backend
  await fetch("http://127.0.0.1:5000/api/signup", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });

  // Opens the login page after sign-up
  window.location.href = "index.html";
});