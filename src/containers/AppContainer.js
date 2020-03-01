import React from 'react';
import { connect } from 'react-redux';
import App from '../App';
import { updatePosts, showUpdateWindows } from '../actions';

const AppContainer = (props) => <App {...props} />;

const mapStateToProps = state => { // return 時，告訴需要什麼資料
  return {
    postsListData: state.posts.postsListData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePosts: data => dispatch(updatePosts(data)),
    showWindows: showData => dispatch(showUpdateWindows(showData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
