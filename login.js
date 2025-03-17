document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("index.html")) {
    printName();
  }
  // Handle Registration
  const registerBtn = document.querySelector(".btnRegister");
  if (registerBtn) {
    registerBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const username = document.querySelector(".username").value.trim();
      const password = document.querySelector(".password").value.trim();
      const confirmPassword = document
        .querySelector(".confirm-password")
        .value.trim();

      // Validation
      if (!username || !password || !confirmPassword) {
        alert("Please fill in all fields!");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Check existing users
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find((user) => user.username === username);

      if (existingUser) {
        alert("Username already exists!");
        return;
      }

      // Save new user
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! Redirecting to login...");
      window.location.href = "login.html";
    });
  }

  // Handle Login
  const loginBtn = document.querySelector(".btnSignin");
  if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const username = document.querySelector(".username").value.trim();
      const password = document.querySelector(".password").value.trim();

      if (!username || !password) {
        alert("Please fill in all fields!");
        return;
      }

      // Check credentials
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const validUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (validUser) {
        alert("Login successful! Redirecting...");
        // Store current user in session
        sessionStorage.setItem("currentUser", JSON.stringify(validUser));
        window.location.href = "./index.html"; // Redirect to your main page
      } else {
        alert("Invalid username or password!");
      }
    });
  }

  // Check if user is already logged in
  if (window.location.pathname.includes("home.html")) {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser) {
      window.location.href = "login.html";
    }
  }
});

function printName() {
  // Get user from session storage
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (currentUser) {
    const nameUser = document.querySelector(".name-user");
    if (nameUser) {
      nameUser.innerHTML = `<b>Welcome</b> ${currentUser.username}`;

      setTimeout(() => {
        nameUser.classList.add("fade-out");

        setTimeout(() => {
          nameUser.innerHTML = "";
          nameUser.classList.remove("fade-out"); //
        }, 500);
      }, 3000);
    }
  } else {
    window.location.href = "login.html";
  }
}
