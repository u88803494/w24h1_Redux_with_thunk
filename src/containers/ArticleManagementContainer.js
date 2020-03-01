import React from 'react';
import { connect } from 'react-redux';
import ArticleManagement from '../component/article_management';
import { changePosts, showManagementWindow, hideMangementWindow } from '../actions';

const ArticleManagementContainer = (props) => <ArticleManagement {...props} />;

const mapStateToProps = state => { // return 時，告訴需要什麼資料
  return {
    ...state.showWindowData,
    posts: state.posts.postsListData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePosts: post => dispatch(changePosts(post)),
    showManagementWindow: showData => dispatch(showManagementWindow(showData)),
    onHide: hideData => dispatch(hideMangementWindow(hideData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleManagementContainer);
