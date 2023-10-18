
function openUpdateModal(post, index) {
  /*
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <input type="text" id="updatedTaskInput" placeholder="Enter updated task" value="${task}" />
      <button id="updateTaskBtn">Update Task</button>
      <button id="closeUpdateModalBtn">Close</button>
    </div>
  `;*/
  const modal = document.createElement("div");
  modal.classList.add("post");
  modal.innerHTML = `
    <div class="feed_posts" data-post-id="${post.id}">
      <img src="${post.media}" class="feed_post_image" alt="Post Image">
      <div class="feed_post_details">
        <h3 class="feed_post_title">${post.title}</h3>
        <p class="feed_post_content">${post.body}</p>
      </div>
      <div class="feed_post_buttons">
        <button id="update_post_button">Update</button>
        <button id="close_modal">Close</button>
      </div>
    </div>
  `;

  const updatedImage = modal.querySelector(".feed_post_image");
  const updatedTitle = modal.querySelector(".feed_post_title");
  const updatedText = modal.querySelector(".feed_post_content");
  
  const updateTaskBtn = modal.querySelector("#updateTaskBtn");
  const closeUpdateModalBtn = modal.querySelector("#closeUpdateModalBtn");

  // Event listener for updating the task
  updateTaskBtn.addEventListener("click", () => {
    const newImage = updatedImage.value;
    const newTitle = updatedTitle.value;
    const newText = updatedText.value;

    if (newImage.trim() !== "" || newTitle.trim() !== "" || newText.trim() !== "") {
      lsUpdateI(index, updatedTask);
      renderTodos();
      closeModal(modal);
    } else {
      // Handle empty input (optional)
      console.log("Task cannot be empty!");
    }
  });

  // Event listener for closing the modal
  closeUpdateModalBtn.addEventListener("click", () => {
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