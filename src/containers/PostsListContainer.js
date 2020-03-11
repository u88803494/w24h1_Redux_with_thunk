import React from 'react';
import { connect } from 'react-redux';
import Posts from '../component/post_list';
import * as actions from '../actions';

const PostsContainer = props => <Posts {...props} />;

const mapStateToProps = state => {
  console.log(state)
  return ({ // return 時，告訴需要什麼資料
    postsListData: state.posts.postsListData,
  });
}

const mapDispatchToProps = dispatch => ({
  showManagementWindow: showData => dispatch(actions.showManagementWindow(showData)),
  getPosts: () => dispatch(actions.getPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
