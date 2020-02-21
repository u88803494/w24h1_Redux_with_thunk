import React from 'react';
import { connect } from 'react-redux';
import Home from '../component/home';
import { updateNavText } from '../actions';

const HomeContainer = (props) => {
  return <Home {...props} />
}

const mapDispatchToPtops = dispatch => {
  return {
    updateNav: text => dispatch(updateNavText(text)),
  }
}

export default connect(null, mapDispatchToPtops)(HomeContainer);
