const bandSignupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const band_name = document.querySelector("#band-signup").value.trim();
  const band_description = document.querySelector('#band-desc').value.trim();
  const email = document.querySelector("#band-email-signup").value.trim();
  const password = document.querySelector("#band-password-signup").value.trim();

  if (band_name && band_description && email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/bands/signup", {
      method: "POST",
      body: JSON.stringify({ band_name, band_description, email, password }),
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

const userSignupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const user_first_name = document.querySelector("#first-name-signup").value.trim();
  const user_last_name = document.querySelector('#last-name-signup').value.trim();
  const email = document.querySelector("#user-email-signup").value.trim();
  const password = document.querySelector("#user-password-signup").value.trim();

  if (user_first_name && user_last_name && email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ user_first_name, user_last_name, email, password }),
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
  .querySelector("#band-signup-form")
  .addEventListener("submit", bandSignupFormHandler);

  document
  .querySelector("#user-signup-form")
  .addEventListener("submit", userSignupFormHandler);
