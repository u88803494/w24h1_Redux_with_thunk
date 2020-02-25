import { UPDATE_NAV_TEXT, UPDATE_POSTS_LIST } from './actionTypes';

export const updateNavText = (text) => ({
	type: UPDATE_NAV_TEXT,
	value: text,
});

export const updatePosts = (posts) => ({
	type: UPDATE_POSTS_LIST,
	posts,
})
