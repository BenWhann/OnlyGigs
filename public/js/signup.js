const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const username = document.querySelector("#username").value.trim();
  const description = document.querySelector('#band-desc').value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const is_band = document.querySelector("#is-band").value.trim();

  if (username && email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, description, email, password, is_band }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/dashboard"); // re-direct elsewhere
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
