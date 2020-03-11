import * as action from './actionTypes';
import * as WebAPI from './WebAPI';

export const getPosts = () => ({
  type: action.GET_POSTS,
  payload: WebAPI.getPosts(),
});

export const updatePosts = posts => ({
  type: action.UPDATE_POSTS_LIST,
  posts,
});

export const changePosts = post => ({
  type: action.CHANGE_POSTS,
  post,
});

export const showManagementWindow = postState => ({
  type: action.SHOW_ARTICLE_MANAGEMENT_WINDOW,
  postState,
});

export const hideMangementWindow = postState => ({
  type: action.HIDE_ARTICLE_MANAGEMENT_WINDOW,
  postState,
});
