
/**
 * API call to register user
 * @param {string} url 
 * @param {any} userData 
*/

export async function registerUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      Headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    };
    const response = await fetch(url, postData);
    console.log(response);

    const json = await response.json();
    console.log(json);
  }
  catch (error) {
    console.log(error);
  }
}

/*
const url = "https://api.noroff.dev/api/v1";

export async function registerUser(name, email, password, avatar, banner) {
  try {
    const data = {
      name: name,
      email: email,
      password: password,
      avatar: avatar,
      banner: banner
    };

    const response = await fetch(url + "/social/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Registration failed. Please try again.");
    }

    return response.json();
  } catch (error) {
    throw new Error("Registration failed. Please try again.");
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(url + "/social/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error("Login failed. Please check your credentials and try again.");
    }

    return response.json();
  } catch (error) {
    throw new Error("Login failed. Please check your credentials and try again.");
  }
}

export function logoutUser() {
  // Implement logout logic, remove token from storage, etc.
}
*/