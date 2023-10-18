import { getApiBase } from "../script.mjs";
const baseUrl = getApiBase();

const createPostUrl = `${baseUrl}/social/posts`;

//const token = localStorage.getItem("accessToken");

const openModal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal_background");

const postImage = document.querySelector("#post_image");
const imagePreview = document.querySelector("#image_preview");
const titleInput = document.querySelector("#post_title");
const contentTextarea = document.querySelector("#post_content");

// Get reference to the search input element
const searchInput = document.querySelector("#searchInput");

/*
  Searching posts
*/
searchInput.addEventListener("input", () => {
   const searchTerm = searchInput.value.toLowerCase();

   // Get all post elements
   const postElements = document.querySelectorAll(".post");

   // Loop through post elements and hide/show based on search term
   postElements.forEach(postElement => {
      const postTitle = postElement.querySelector(".feed_post_title").textContent.toLowerCase();
      if (postTitle.includes(searchTerm)) {
         postElement.style.display = "block";
      } else {
         postElement.style.display = "none";
      }
   });
});


// Update function 
const updatePost = async (postId, postData) => {
  try {
    // Get the token from local storage
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("User unidentified!");
      return;
    }

    // Construct the API endpoint URL for updating the post
    const updatePostUrl = `${baseUrl}/social/posts/${postId}`;

    // Send a PUT request to update the post
    const response = await fetch(updatePostUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      // Post update successful, handle the response here if needed
      console.log("Post updated successfully");
      // Optionally, redirect the user to a different page or update the UI
    } else {
      // Handle the case where the API request fails (display error message, etc.)
      console.log("Failed to update post");
      // Optionally, display an error message to the user
    }
  } catch (error) {
    console.log("Error updating post:", error);
  }
};


// Delete function
async function deletePost(postId) {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("User unidentified!");
      return;
    }
    const deletePostUrl = `${baseUrl}/social/posts/${postId}`;
    const response = await fetch(deletePostUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      // Post deletion successful, handle the response here if needed
      console.log("Post deleted successfully");
    } else {
      // Handle the case where the API request fails (display error message, etc.)
      console.log("Failed to delete post");
    }
  } catch (error) {
    console.log("Error deleting post:", error);
    throw error; // Propagate the error for the caller to handle, if necessary
  }
}


/* 
  Get all posts
*/
document.addEventListener("DOMContentLoaded", async () => {
  const sortOptions = document.getElementById("sort-options");
  const postContainer = document.querySelector("#post_container");

  // Fetch posts from the API endpoint
  try {
    const response = await fetch(`${baseUrl}/social/posts`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }
    });

    if (response.ok) {
      const posts = await response.json();

      // Loop through the retrieved posts and populate the postContainer
      posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.dataset.created = post.created;

        postElement.innerHTML = `
          <div class="feed_posts" data-post-id="${post.id}">
            <img src="${post.media}" class="feed_post_image" alt="Post Image">
            <div class="feed_post_details">
              <h3 class="feed_post_title">${post.title}</h3>
              <p class="feed_post_content">${post.body}</p>
            </div>
            <div class="feed_post_buttons">
              <button class="feed_post_update">Update</button>
              <button class="feed_post_view">View</button>
              <button class="feed_post_delete">Delete</button>
            </div>
          </div>
        `;

        postContainer.appendChild(postElement);

        // Update button
        const updateButton = postElement.querySelector(".feed_post_update");
        updateButton.addEventListener("click", () => {
          const postId = postElement.dataset.postId; 
          openModalForUpdate(post, postId);
        });

        // View button
        const viewButton = postElement.querySelector(".feed_post_view");
        viewButton.addEventListener("click", async (event) => {
          const postElement = event.target.closest(".feed_posts");
          if (postElement) {
            const postId = postElement.dataset.postId;
            // Redirect to the post.html page with the specific post ID
            window.location.href = `post.html?id=${postId}`;
          }
        });

      });
    } 
    else {
      console.error("Failed to fetch posts");
    }
  } 
  catch (error) {
    console.error("Error fetching posts:", error);
  }


  // Input choices
  const sortPosts = () => {
    const selectedOption = sortOptions.value;
    const posts = Array.from(postContainer.children);

    posts.sort((a, b) => {
      const dateA = new Date(a.dataset.created);
      const dateB = new Date(b.dataset.created);

      if (selectedOption === "alphabetical-asc") {
        return a.querySelector(".feed_post_title").textContent.localeCompare(b.querySelector(".feed_post_title").textContent);
      } 
      if (selectedOption === "alphabetical-desc") {
        return b.querySelector(".feed_post_title").textContent.localeCompare(a.querySelector(".feed_post_title").textContent);
      } 
      if (selectedOption === "recent") {
        return dateB - dateA;
      } 
      if (selectedOption === "oldest") {
        return dateA - dateB;
      }

      return 0;
    });

    // Clear existing posts from the container
    postContainer.innerHTML = "";

    // Append sorted posts back to the container
    posts.forEach(post => {
        postContainer.appendChild(post);
    });
  };


  // Event listeners for sorting and searching
  sortOptions.addEventListener("change", sortPosts);
  searchInput.addEventListener("input", sortPosts);
  

  // Update the post
  function openModalForUpdate(post) {
    const modal = document.createElement("div");
    modal.classList.add("modal"); // Apply your modal styles here
    modal.innerHTML = `
      <div class="feed_posts" data-post-id="${post.id}">
        <div class="updated_info">
          <input type="text" id="updated_image" placeholder="New Image URL" value="${post.media}">
          <input type="text" id="updated_title" placeholder="New Title" value="${post.title}">
          <textarea id="updated_content" placeholder="New Content">${post.body}</textarea>
        </div>
        
        <div class="update_post_buttons">
          <button id="update_post_button">Update</button>
          <button id="close_modal">Close</button>
        </div>
      </div>
    `;

    const updateButton = modal.querySelector("#update_post_button");
    const closeButton = modal.querySelector("#close_modal");
    const updatedImageInput = modal.querySelector("#updated_image");
    const updatedTitleInput = modal.querySelector("#updated_title");
    const updatedContentTextarea = modal.querySelector("#updated_content");

    // Event listener for updating the post
    updateButton.addEventListener("click", async () => {
      const updatedImage = updatedImageInput.value;
      const updatedTitle = updatedTitleInput.value;
      const updatedContent = updatedContentTextarea.value;

      // Validate input (optional)
      if (updatedImage.trim() === "" || updatedTitle.trim() === "" || updatedContent.trim() === "") {
        console.log("Fields cannot be empty!");
        return;
      }

      // Create postData object
      const postData = {
        media: updatedImage,
        title: updatedTitle,
        body: updatedContent
      };

      // Call the updatePost function
      await updatePost(post.id, postData);

      // Closes the modal
      closeModal(modal);
      location.reload();
    });

    // Event listener for closing the modal
    closeButton.addEventListener("click", () => {
      closeModal(modal);
    });

    // Show the modal
    showModal(modal);
  }

  function showModal(modal) {
    document.body.appendChild(modal);
    modal.style.display = "block";
  }
  
  function closeModal(modal) {
    document.body.removeChild(modal);
  }


  // Code for the view post page
  /*
  if (window.location.pathname.includes("post.html")) {
    const postId = new URLSearchParams(window.location.search).get("id");
    if (postId) {
      try {
        const postResponse = await fetch(`${baseUrl}/social/posts/${postId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        });

        if (postResponse.ok) {
          const postData = await postResponse.json();
          // Render the post details using postData (e.g., postData.title, postData.body, etc.)
        } else {
          console.error("Failed to fetch post details");
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    } else {
      console.error("Post ID not found in the URL");
    }
  }*/


  // Delete the post
  postContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("feed_post_delete")) {
      const postId = event.target.closest(".feed_posts").dataset.postId;
      try {
        await deletePost(postId);
        location.reload();
      } 
      catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  });
});


// View the post
/*
fetchAndDisplayPosts();

function navigateToPostDetails(postId) {
  const postDetailsUrl = `${baseUrl}/social/posts/${postId}`;
  window.location.href = postDetailsUrl;
}*/


// Opens up modal to make a post
const addPostButton = document.querySelector("#add_post_button");
addPostButton.addEventListener("click", () => {
  openModal.style.display = "block";
  modalBackground.style.display = "block";
});

// Shows the image from the url
postImage.addEventListener("input", (event) => {
  const imageUrl = event.target.value.trim(); // Get the URL input value

  if (imageUrl) {
    // Set the <img> element's src attribute to the provided URL
    imagePreview.src = imageUrl;
  } else {
    // Clear the <img> element if the input is empty
    imagePreview.src = "";
  }
});

// Closes the modal
const closeButton = document.querySelector("#close_modal");
closeButton.addEventListener("click", (event) => {
  event.preventDefault();

  openModal.style.display = "none";
  modalBackground.style.display = "none";
});


// Submits the post
const postForm = document.querySelector(".modal");

postForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Retrieve data from form fields
  const title = document.querySelector("#post_title").value;
  const content = document.querySelector("#post_content").value;
  const imageUrl = document.querySelector("#post_image").value;

  // Prepare post data object
  const postData = {
    title: title,
    body: content,
    media: imageUrl,
  };

  try {
    // Get user's access token from localStorage
    const token = localStorage.getItem("accessToken");

    // Make API request to create a new post
    const response = await fetch(createPostUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      // Post creation successful
      console.log("Post created successfully!");
      
      openModal.style.display = "none";
      modalBackground.style.display = "none";

      fetchPosts();
      location.reload();
    } else {
      // Handle API error (display error message, etc.)
      console.error("Failed to create post");
    }
  } catch (error) {
    // Handle other types of errors (network issues, etc.)
    console.error("Error creating post:", error);
  }
});

// Function to fetch posts and update the UI
async function fetchPosts() {
  try {
    const response = await fetch(`${baseUrl}/social/posts`);
    if (response.ok) {
      const data = await response.json();
      // Update the UI with the fetched posts data (e.g., renderPosts(data))
      console.log("Fetched posts:", data);
    } else {
      console.log("Failed to fetch posts");
    }
  } catch (error) {
    console.log("Error fetching posts:", error);
  }
}