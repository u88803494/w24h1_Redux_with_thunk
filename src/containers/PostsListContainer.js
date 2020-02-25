import React from 'react';
import { connect } from 'react-redux';
import Posts from '../component/post_list/';
import { updateNavText } from '../actions';

const PostsContainer = (props) => {
  console.log(props)
  return <Posts {...props} />
}

const mapStateToProps = state => {
  console.log(state)
  return {
    data: state.posts.postsListData,
  }
}

const mapDispatchToPtops = dispatch => {
  console.log(dispatch)
  return {
    updateNav: data => dispatch(updateNavText(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToPtops)(PostsContainer);
