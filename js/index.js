const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");
const signupBtn = document.getElementById("signupBtn");
const password = document.getElementById("password");
const flipPassword = document.getElementById("flipPassword");

// Backend base URL
const API_BASE_URL = "https://community-issues-backend.onrender.com";

// View password functionaality
flipPassword.addEventListener("click", () => {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  flipPassword.classList.toggle("fa-eye");
  flipPassword.classList.toggle("fa-eye-slash");
});

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  signupBtn.textContent = "Signing Up...";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      signupMessage.style.color = "green";
      signupMessage.textContent = "Signup successful! You can now login.";
      alert("Signup successful! You can now login.");
      window.location.href = "login.html";
      signupForm.reset();
    } else {
      signupMessage.style.color = "red";
      signupMessage.textContent = data.error || "Signup failed";
    }
  } catch (err) {
    signupMessage.style.color = "red";
    signupMessage.textContent = "Error connecting to server";
  }
  signupBtn.textContent = "Sign Up";
});
