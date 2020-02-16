import axios from 'axios';

// axios.get('https://qootest.com/posts')

export const getPosts = () =>
  axios.get('https://qootest.com/posts');

export const getPost = postId =>
  axios.get('https://qootest.com/posts/' + postId);

export const deletePost = postId => 
  axios.delete('https://qootest.com/posts/' + postId)
  /* axios.delete(url[, config]) */
