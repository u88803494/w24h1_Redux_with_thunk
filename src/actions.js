import * as action from './actionTypes';
import * as WebAPI from './WebAPI';

export const getPost = () => ({
  type: action.GET_POST,
  payload: WebAPI.getPost(),
});

export const getPosts = () => ({
  type: action.GET_POSTS,
  payload: WebAPI.getPosts(),
});

export const updatePosts = posts => ({
  type: action.UPDATE_POSTS_LIST,
  posts,
});

export const deletePost = (id) => ({
  type: action.DELETE_POST,
  postId: id,
  payload: WebAPI.deletePost(id),
});

export const changePosts = post => ({
  type: action.CHANGE_POSTS,
  post,
});

export const showManagementWindow = postState => ({
  type: action.SHOW_ARTICLE_MANAGEMENT_WINDOW,
  postState,
});

export const hideMangementWindow = () => ({
  type: action.HIDE_ARTICLE_MANAGEMENT_WINDOW,
});
