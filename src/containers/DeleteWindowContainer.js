import React from 'react';
import { connect } from 'react-redux';
import { DeleteWindow } from '../component/editing_window';
import { changePosts } from '../actions';

const DeleteWindowContainer = (props) => <DeleteWindow {...props} />;

const mapDispatchToProps = dispatch => {
  return {
    changePosts: post => dispatch(changePosts(post))
  }
}

export default connect(null, mapDispatchToProps)(DeleteWindowContainer);
