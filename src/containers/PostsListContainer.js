import React from 'react';
import { connect } from 'react-redux';
import Posts from '../component/post_list/';
import { updatePosts } from '../actions';

const PostsContainer = (props) => {
  return <Posts {...props} />
}

const mapStateToProps = state => { // return 時，告訴需要什麼資料
  console.log(state)
  return {
    postsListData: state.posts.postsListData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePosts: data => dispatch(updatePosts(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
