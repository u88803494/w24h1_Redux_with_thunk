import axios from 'axios';

export const createPost = post =>
  axios.post('https://qootest.com/posts/', post)

export const getPosts = () =>
  axios.get('https://qootest.com/posts');

export const getPost = postId =>
  axios.get('https://qootest.com/posts/' + postId);

export const updatePost = post =>
  axios.put('https://qootest.com/posts/' + post.id, post)

export const deletePost = postId =>
  axios.delete('https://qootest.com/posts' + postId)
