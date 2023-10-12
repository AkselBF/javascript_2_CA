
document.querySelector(".register_button").addEventListener("click", function() {
  handleForm("register");
});

document.getElementById(".login_button").addEventListener("click", function() {
  handleForm("login");
});

function handleForm(action) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const avatar = document.getElementById("avatar").value || null;
  const banner = document.getElementById("banner").value || null;

  // Regular expression patterns for email and password validation
  const emailPattern = /^[a-zA-Z0-9._-]+@(noroff\.no|stud\.noroff\.no)$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{9,}$/;

  if (!email.match(emailPattern)) {
    console.error("Invalid email format. Please use a valid email address.");
    return;
  }

  if (!password.match(passwordPattern)) {
    console.error("Invalid password format. Password must have at least 9 characters, one uppercase letter, and one number.");
    return;
  }

  if (action === 'register') {
    registerUser(name, email, password, avatar, banner)
      .then(response => {
        console.log("Registration successful!", response);
      })
      .catch(error => {
        console.error("Registration failed:", error.message);
      });
  } else if (action === 'login') {
    loginUser(email, password)
      .then(response => {
        console.log("Login successful!", response);
      })
      .catch(error => {
        console.error("Login failed:", error.message);
      });
  }
}