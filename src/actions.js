import * as actionTypes from './actionTypes';
import * as WebAPI from './WebAPI';

// CREATE
export const createPost = (post) => (dispatch) => {
  WebAPI.createPost(post)
    .then(res => res.status <= 300 && dispatch(createPostFulfilled()))
    .catch(err => dispatch(createPostRejected(err)));
}

export const errorCreatePost = (post) => (dispatch) => {
  WebAPI.errorCreatePost(post)
    .then(res => res.status <= 300 && dispatch(createPostFulfilled()))
    .catch(err => dispatch(createPostRejected(err)));
}

export const createPostFulfilled = () => ({
  type: actionTypes.CREATE_POST_FULFILLED,
})

export const createPostRejected = (err) => ({
  type: actionTypes.CREATE_POST_REJECTED,
  err,
})

// Read
export const getPost = () => ({
  type: actionTypes.GET_POST,
  payload: WebAPI.getPost(),
});

export const getPostsList = () => dispatch => {
  WebAPI.getPosts()
    .then(res => dispatch(getPostsFulfilled(res.data)))
    .catch(err => dispatch(getPostsRejected(err)));
};

export const getPostsFulfilled = (data) => ({
  type: actionTypes.GET_POSTS_FULFILLED,
  data,
});

export const getPostsRejected = (err) => ({
  type: actionTypes.GET_POSTS_REJECTED,
  err,
});

// UPDATA
export const updatePost = post => dispatch => {
  WebAPI.updatePost(post)
    .then(res => res.status <= 300 && dispatch(updatePostFulfilled()))
    .catch(err => dispatch(updatePostRejected(err)))
}

export const errorUpdatePost = post => dispatch => {
  WebAPI.errorUpdatePost(post)
    .then(res => res.status <= 300 && dispatch(updatePostFulfilled()))
    .catch(err => dispatch(updatePostRejected(err)))
}

export const updatePostFulfilled = () => ({
  type: actionTypes.UPDATE_POST_FULFILLED,
});

export const updatePostRejected = err => ({
  type: actionTypes.UPDATE_POST_REJECTED,
  err,
});

// DELETE
export const deletePost = id => dispatch => {
  WebAPI.deletePost(id)
    .then(res => res.status <= 300 && dispatch(updatePostFulfilled()))
    .catch(err => dispatch(updatePostRejected(err)))
}

export const errorDeletePost = id => dispatch => {
  WebAPI.errorDeletePost(id)
    .then(res => res.status <= 300 && dispatch(updatePostFulfilled()))
    .catch(err => dispatch(updatePostRejected(err)))
}

export const deletePostFulfilled = () => ({
  type: actionTypes.DELETE_POST_FULFILLED,
});

export const deletePostRejected = err => ({
  type: actionTypes.DELETE_POST_REJECTED,
  err,
});

export const showManagementWindow = postState => ({
  type: actionTypes.SHOW_ARTICLE_MANAGEMENT_WINDOW,
  postState,
});

export const hideMangementWindow = () => ({
  type: actionTypes.HIDE_ARTICLE_MANAGEMENT_WINDOW,
});
