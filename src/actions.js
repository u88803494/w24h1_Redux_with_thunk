import {
	UPDATE_NAV_TEXT,
	UPDATE_POSTS_LIST,
	CHANGE_POSTS,
	SHOW_ARTICLE_MANAGEMENT_WINDOWS,
} from './actionTypes';

export const updateNavText = (text) => ({
	type: UPDATE_NAV_TEXT,
	value: text,
});

export const updatePosts = (posts) => ({
	type: UPDATE_POSTS_LIST,
	posts,
})

export const changePosts = (post) => ({
	type: CHANGE_POSTS,
	post
})

export const showUpdateWindows = (postStatus) => ({
	// postState 可能會需要夾帶是否顯示、那一種類型（新增、編輯、刪除），編輯刪除則是需要夾帶id
	type: SHOW_ARTICLE_MANAGEMENT_WINDOWS,
	postStatus,
})
