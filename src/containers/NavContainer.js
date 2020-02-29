import React from 'react';
import { connect } from 'react-redux';
import TheNavbar from '../component/nav/';

const NavContainer = (props) => <TheNavbar {...props} />;

const mapStateToProps = state => {
  return {
    navText: state.nav.navText
  }
}

export default connect(mapStateToProps)(NavContainer);
