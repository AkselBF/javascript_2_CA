
export async function getWithToken(url, method = "GET") {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    const fetchOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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