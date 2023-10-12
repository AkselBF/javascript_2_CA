const baseUrl = "https://api.noroff.dev/api/v1";

// Function to fetch data with authentication
export async function fetchData() {
  const jwtToken = localStorage.getItem("jwtToken");

  if (!jwtToken) {
    return { success: false, message: "User not authenticated." };
  }

  try {
    const response = await fetch(baseUrl + "/api/data", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwtToken}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      throw new Error("Error fetching data.");
    }
  } catch (error) {
    return { success: false, message: "Error fetching data.", error: error.message };
  }
}