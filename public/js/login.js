const loginFormHandler = async (event) => {
    event.preventDefault();
    
    // Collect values from the login form
    const user_firstName = document.querySelector('#first-login').value.trim();
    const user_lastName = document.querySelector('#last-login').value.trim();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
    if (user_firstName && user_lastName && email && password) {
  
    // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ user_firstName, user_lastName, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/'); // re-direct elsewhere
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);