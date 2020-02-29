import React from 'react';
import { connect } from 'react-redux';
import { DeleteWindow } from '../component/editing_window';
import { changePosts } from '../actions';

const DeleteWindowContainer = (props) => {
  return <DeleteWindow {...props} />
}

const mapStateToProps = state => { // 這裡應該不需要
  return {
    posts: state.posts.postsListData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePosts: post => dispatch(changePosts(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteWindowContainer);
