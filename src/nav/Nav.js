import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

class TheNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      positionY: window.pageYOffset,
      movedY: 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = (e) => {
    const lastPositonY = this.state.positionY; // 取得舊位置
    const ScrollWidth = window.pageYOffset - lastPositonY;
    console.log(ScrollWidth);
    this.setState({
      positionY: window.pageYOffset
    }); // 取得新位置

    // console.log('scroll', window.pageYOffset);
    // alert("檢測到頁面滾動事件:"+window.pageXOffset+" "+window.pageYOffset);
    // console.log(document.body.scrollTop, document.documentElement.scrollTop);
  }

  calculateScrollWidth = () => {

  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/#">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/#">首頁</Nav.Link>
            <Nav.Link href="/#posts">文章列表</Nav.Link>
            <Nav.Link href="/#about">關於我</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  };
}

export default TheNavbar;
