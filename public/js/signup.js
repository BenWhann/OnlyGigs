const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const band_name = document.querySelector("#band-signup").value.trim();
  const band_description = document.querySelector('#band-desc').value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

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

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
