import React, { Component } from 'react';
import './home.css';
import { Button } from 'react-bootstrap';

const style = {
  homepage: {
    fontSize: '40px',
    paddingTop: '10px',
  }
}

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Button variant="primary"> 123456 </Button>
        <div style={style.homppage}>I am homepage</div>
      </div>
    );

  }
}

export default Home;
