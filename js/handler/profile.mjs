
document.addEventListener("DOMContentLoaded", () => {
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
  } 
  else {
    window.location.href = "../../index.html"; 
  } 
});

const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("accessToken");

  // Redirect to login page
  window.location.href = "../../index.html";
});