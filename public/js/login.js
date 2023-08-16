const bandLoginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#band-email-login").value.trim();
  const password = document.querySelector("#band-password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/bands/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

const userLoginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#user-email-login").value.trim();
  const password = document.querySelector("#user-password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#band-login-form')
  .addEventListener('submit', bandLoginFormHandler);

  document
  .querySelector('#user-login-form')
  .addEventListener('submit', userLoginFormHandler);