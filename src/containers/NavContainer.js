import React from 'react';
import { connect } from 'react-redux';
import Nav from '../component/nav/';

const NavContainer = (props) => {
  return <Nav {...props} />
}

const mapStateToProps = state => {
  return {
    navText: state.nav.navText
  }
}

export default connect(mapStateToProps)(NavContainer);
