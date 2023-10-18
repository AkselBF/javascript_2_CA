// Import the baseUrl variable from script.mjs
//import { getApiBase } from "../script.mjs";

//const baseUrl = "https://api.noroff.dev/api/v1";

document.addEventListener("DOMContentLoaded", () => {
  // Check if user information is stored in localStorage
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const avatar = localStorage.getItem("avatar");
  //const banner = localStorage.getItem("banner");

  // Check if user is logged in
  const token = localStorage.getItem("accessToken");

  if (token && name && email && avatar) {
    document.querySelector("#user_name").textContent = name;
    document.querySelector("#user_email").textContent = email;
    document.querySelector("#user_avatar").src = avatar;
    //document.querySelector("#user_banner").src = banner;
  } else {
    // Redirect to the login page
    window.location.href = "../../index.html"; 
  } 
});

//await fetch(`${getApiBase}/auth/register`);
//await fetch(`${getApiBase}/auth/login`);

const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  // Clear JWT token from local storage
  localStorage.removeItem("accessToken");

  // Redirect to the login page
  window.location.href = "../../index.html"; // Adjust the URL as per your project structure
});