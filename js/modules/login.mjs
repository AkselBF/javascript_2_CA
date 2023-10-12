
export async function loginUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    };
    const response = await fetch(url, postData);
    console.log(response);

    const json = await response.json();
    console.log(json);
    console.log(json.accessToken);

    localStorage.setItem("accessToken", json.accessToken);
    localStorage.setItem("name", json.name);
    localStorage.setItem("name", json.email);
    localStorage.setItem("name", json.avatar);
    localStorage.setItem("name", json.banner);
  }
  catch (error) {
    console.log(error);
  }
}

/*
const url = "https://api.noroff.dev/api/v1";

// Function to handle user registration
export async function registerUser(email, password) {
  try {
    const response = await fetch(url + "/social/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

// Function to handle user login
export async function loginUser(email, password) {
  try {
    const response = await fetch(url + "/social/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}
*/