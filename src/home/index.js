import React, { Component } from 'react';
import './home.css';
import { Button, Image, Figure } from 'react-bootstrap';

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
        <div style={style.homepage}>I am homepage</div>
        <Image src="https://i.imgur.com/Pl30j07.jpg" fluid />
        <Figure>
          <Figure.Image
            width={1024}
            height={768}
            alt="1024x768"
            src="https://i.imgur.com/Pl30j07.jpg"
          />
          <Figure.Caption>
            Nulla vitae elit libero, a pharetra augue mollis interdum.
          </Figure.Caption>
        </Figure>
      </div>
    );

  }
}

export default Home;
