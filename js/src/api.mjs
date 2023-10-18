import { getApiBase } from "../script.mjs";

const baseUrl = getApiBase();

export async function fetchPosts() {
  try {
    const response = await fetch(`${baseUrl}/social/posts`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch posts");
    }
  } catch (error) {
    throw new Error("Error fetching posts: " + error.message);
  }
}

export async function createPost(postData) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${baseUrl}/social/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Failed to create post");
    }
  } catch (error) {
    throw new Error("Error creating post: " + error.message);
  }
}