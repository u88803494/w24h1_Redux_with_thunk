import React from 'react';
import { connect } from 'react-redux';
import ArticleManagement from '../component/article_management';
import * as actions from '../actions';

const ArticleManagementContainer = props => <ArticleManagement {...props} />;

const mapStateToProps = state => {
  console.log(state)
  return ({
    ...state.postState,
    posts: state.posts.postsListData,
  });
}

const mapDispatchToProps = dispatch => ({
  changePosts: post => dispatch(actions.changePosts(post)),
  deletePost: id => dispatch(actions.deletePost(id)),
  showManagementWindow: showData => dispatch(actions.showManagementWindow(showData)),
  onHide: () => dispatch(actions.hideMangementWindow()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleManagementContainer);
