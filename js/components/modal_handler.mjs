//import { getApiBase } from "../script.mjs";
//const createPostUrl = `${baseUrl}/social/posts`;
const openModal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal_background");

const baseUrl = getApiBase();

export async function handlePostFormSubmission(event) {
  event.preventDefault();

  const title = document.querySelector("#post_title").value;
  const content = document.querySelector("#post_content").value;
  const imageUrl = document.querySelector("#post_image").value;

  const postData = {
    title: title,
    body: content,
    media: imageUrl,
  };

  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(createPostUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      console.log("Post created successfully!");
      openModal.style.display = "none";
      modalBackground.style.display = "none";
      fetchPosts(); // Assuming fetchPosts() is defined elsewhere to update the post list
    } else {
      console.error("Failed to create post");
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
}