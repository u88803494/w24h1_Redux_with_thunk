import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const TheNavbar = ({ page, onClick }) => (
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
);

export default TheNavbar;
