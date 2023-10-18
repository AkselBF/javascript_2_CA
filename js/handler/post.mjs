import { baseUrl } from "../src/api.mjs";

const postId = getPostIdFromUrl(); // Assuming you have a function to extract post ID from the URL

const postDetailsContainer = document.querySelector('.post_details');

async function fetchPostDetails(postId) {
  try {
    const response = await fetch(`${baseUrl}/social/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
      }
    });

    if (response.ok) {
      const post = await response.json();
      displayPostDetails(post);
    } 
    else {
      console.log('Failed to fetch post details');
    }
  } 
  catch (error) {
    console.error('Error fetching post details:', error);
  }
}

function displayPostDetails(post) {
  const {
    title,
    body,
    tags,
    media,
    created,
    updated,
    id,
    _count: { comments, reactions }
  } = post;

  document.getElementById('post_title').textContent = title;
  document.getElementById('post_body').textContent = body;
  document.getElementById('post_tags').textContent = tags.join(', ');
  document.getElementById('post_media').src = media;
  document.getElementById('post_created').textContent = `Created: ${created}`;
  document.getElementById('post_updated').textContent = `Last Updated: ${updated}`;
  document.getElementById('post_id').textContent = `Post ID: ${id}`;
  document.getElementById('post_comments').textContent = `Comments: ${comments}`;
  document.getElementById('post_reactions').textContent = `Reactions: ${reactions}`;
}

function getPostIdFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('id');
}

document.addEventListener('DOMContentLoaded', () => {
  fetchPostDetails(postId);
});