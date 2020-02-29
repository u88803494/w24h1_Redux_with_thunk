import React from 'react';
import { connect } from 'react-redux';
import { EditingWindow } from '../component/editing_window';
import { changePosts } from '../actions';

const EditingWindowContainer = (props) => {
  return <EditingWindow {...props} />
}

const mapStateToProps = state => { // return 時，告訴需要什麼資料
  return {
    posts: state.posts.postsListData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePosts: post => dispatch(changePosts(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditingWindowContainer);
