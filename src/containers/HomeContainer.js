import React from 'react';
import { connect } from 'react-redux';
import Home from '../component/home';
import { updateNavText } from '../actions';

const HomeContainer = (props) => <Home {...props} />;

const mapDispatchToProps = dispatch => {
  return {
    updateNav: text => dispatch(updateNavText(text)),
  }
}

export default connect(null, mapDispatchToProps)(HomeContainer);
