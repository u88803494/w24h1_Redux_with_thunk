import React from 'react';
import { connect } from 'react-redux';
import ArticleManagement from '../component/article_management';
import * as actions from '../actions';

const ArticleManagementContainer = props => <ArticleManagement {...props} />;

const mapStateToProps = state => {
  return ({ // 如果傳很多資料，是否改成物件的形式會比較好呢？本來試著改，結果發現這樣就要解構再解構很麻煩
    ...state.postState,
    posts: state.posts.postsListData,
    shouldGetPosts: state.posts.shouldGetPosts,
    error: state.posts.error,
  });
}

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(actions.createPost(post)),
  updatePost: post => dispatch(actions.updatePost(post)),
  deletePost: id => dispatch(actions.deletePost(id)),
  showManagementWindow: showData => dispatch(actions.showManagementWindow(showData)),
  onHide: () => dispatch(actions.hideMangementWindow()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleManagementContainer);
