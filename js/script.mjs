//const url = "https://api.noroff.dev/api/v1/";

import { registerUser } from "./modules/auth.mjs";
import { loginUser } from "./modules/login.mjs";
//import { fetchData } from "./modules/api.mjs";
//import { postData } from "./handler/post.mjs";
//import { updateData } from "./update.mjs";
//import { deleteData } from "./delete.mjs";


if (localStorage.getItem("accessToken")) {
  window.location.href = "../html/profile.html";
}
else {
  window.location.href = "../index.html";
}

// API url
const baseUrl = "https://api.noroff.dev/api/v1";

// For register function
const userToRegister = {
  name: "test_user_demo",
  email: "test_user_demo@noroff.no",
  password: "Nstudent2023",
}

const registerUrl = `${baseUrl}/social/auth/register`;
registerUser(registerUrl, userToRegister);

// For login function
const userToLogin = {
  email: "test_user_demo2@noroff.no",
  password: "Nstudent2023",
}

const loginUrl = `${baseUrl}/social/auth/login`;
loginUser(loginUrl, userToLogin);

// For JWT token
async function getWithToken(url, method = "GET") {
  try {
    console.log(url);
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const fetchOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    };

    const response = await fetch(url, fetchOptions);
    console.log(response);

    const json = await response.json();
    console.log(json);
  }
  catch (error) {
    console.log(error);
  }
}

const postsUrl = `${baseUrl}/social/posts`;
getWithToken(postsUrl);