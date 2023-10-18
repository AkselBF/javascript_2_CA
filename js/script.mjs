//const baseUrl = "https://api.noroff.dev/api/v1";
import { baseUrl } from "./src/api.mjs";

const dev_base = "localhost:5500/v1";
const isDev = false;

export function getApiBase() {
  if (isDev) {
    return dev_base;
  }
  return baseUrl;
}

const registerUrl = `${baseUrl}/social/auth/register`;
const loginUrl = `${baseUrl}/social/auth/login`;

document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.querySelector("#registration_form");
  const loginForm = document.querySelector("#login_form");
  const loginButton = document.querySelector("#login_button");
  const registerButton = document.querySelector("#register_button");

  loginButton.addEventListener("click", () => {
    loginForm.style.display = "block";
    registrationForm.style.display = "none";
  });

  registerButton.addEventListener("click", () => {
    registrationForm.style.display = "block";
    loginForm.style.display = "none";
  });

  // Avatar url (Shows avatar image with url)
  const avatarUrlInput = document.querySelector("#avatar");
  const avatarPreview = document.querySelector("#avatar_preview");

  avatarUrlInput.addEventListener("input", (event) => {
    const avatarUrl = event.target.value.trim();

    if (avatarUrl) {
      avatarPreview.src = avatarUrl;
    } 
    else {
      avatarPreview.src = "";
    }
  });

  registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(registrationForm);
    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      avatar: formData.get("avatar"),
      //banner: formData.get("banner")
    };

    try {
      const response = await registerUser(userData);
      handleResponse(response);
    } 
    catch (error) {
      handleError(error);
    }
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {
      const response = await loginUser(userData);
      handleResponse(response);
    } 
    catch (error) {
      handleError(error);
    }
  });


  // Registration form
  async function registerUser(userData) {
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@(noroff\.no|stud\.noroff\.no)$/;
    if (!emailRegex.test(userData.email)) {
      console.log("Invalid email format");
      return { success: false, message: "Invalid email format" };
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(userData.password)) {
      console.log("Invalid password format");
      return { success: false, message: "Invalid password format" };
    }

    try {
      const apiRequestBody = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        avatar: userData.avatar || "",
        //banner: userData.banner || ""
      };

      // Make API call to register the user
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      // Handle API response
      if (response.ok) {
        const jsonResponse = await response.json();
        localStorage.setItem("accessToken", jsonResponse.accessToken);
        localStorage.setItem("name", jsonResponse.name);
        localStorage.setItem("email", jsonResponse.email);
        localStorage.setItem("avatar", jsonResponse.avatar);
        //localStorage.setItem("banner", jsonResponse.banner);

        if (jsonResponse.avatar) {
          localStorage.setItem("avatar", jsonResponse.avatar);
        }

        window.location.href = "../html/profile.html";

        return { success: true, message: "Registration successful" };
      } 
      else {
        const errorData = await response.json(); 
        const errorMessage = errorData.errors[0].message; 
        console.log("Registration failed:", errorMessage);
        return { success: false, message: errorMessage };
      }
    } 
    catch (error) {
      // Handle API call errors
      console.error("Registration error:", error);
      return { success: false, message: "Registration error" };
    }
  }

  // Login form
  async function loginUser(userData) {
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@(noroff\.no|stud\.noroff\.no)$/; 

    if (!emailRegex.test(userData.email)) {
      console.log("Invalid email format");
      return { success: false, message: "Invalid email format" };
    }

    // Ensure password is provided
    if (!userData.password) {
      // Password not provided
      console.log("Password not provided");
      return { success: false, message: "Password not provided" };
    }

    try {
      // Prepare API request body
      const apiRequestBody = {
        email: userData.email,
        password: userData.password
      };

      // Make API call to authenticate the user
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      // Handle API response
      if (response.ok) {
        const jsonResponse = await response.json();
        localStorage.setItem("accessToken", jsonResponse.accessToken);
        localStorage.setItem("name", jsonResponse.name);
        localStorage.setItem("email", jsonResponse.email);
        localStorage.setItem("avatar", jsonResponse.avatar);
        //localStorage.setItem("banner", jsonResponse.banner);

        if (jsonResponse.avatar) {
          localStorage.setItem("avatar", jsonResponse.avatar);
        }

        window.location.href = "../html/profile.html";

        return { success: true, message: "Login successful" };
      } 
      else {
        const errorMessage = await response.json();
        console.log("Registration failed:", errorMessage.message);
        return { success: false, message: errorMessage.message };
      }
    } 
    catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login error" };
    }
  }

  function handleResponse(response) {
    if (response.ok) {
      return response.json().then(data => {
        return data;
      });
    } 
    else {
      const errorMessage = response.statusText || "Server Error";
      console.log("API Error:", errorMessage);
      throw new Error("API Error: " + errorMessage); 
    }
  }

  function handleError(error) {
    console.error(error);
  }
});