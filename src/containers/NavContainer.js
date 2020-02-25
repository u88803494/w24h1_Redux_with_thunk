import React from 'react';
import { connect } from 'react-redux';
import TheNavbar from '../component/nav/';

const NavContainer = (props) => {
  console.log(props)
  return <TheNavbar {...props} />
}

const mapStateToProps = state => {
  console.log(state)
  return {
    navText: state.nav.navText
  }
}

export default connect(mapStateToProps)(NavContainer);
