const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const user_firstName = document.querySelector("#first-signup").value.trim();
  const user_lastName = document.querySelector("#last-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (user_firstName && user_lastName && email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ user_firstName, user_lastName, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/"); // re-direct elsewhere
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
