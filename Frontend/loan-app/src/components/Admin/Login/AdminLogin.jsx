import React from "react";

//function to send data to backend
const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  fetch("/api/login", {
    method: "POST",
    body: data,
  });
};

const LoginPage = () => {
  return (
    <div class="login-container">
      <div>
        <div class="form-header">
          <h1>Admin Login</h1>
        </div>
        <form class="form-container" id="login-form">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required />
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required />
          <button type="submit" onSubmit={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
