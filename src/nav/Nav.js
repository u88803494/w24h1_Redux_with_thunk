import React from 'react';
import './Nav.css';
import { Link, Route } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';


const Item = ({ to, text, exact }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <Link to={to}>
        <li className={match ? "active" : ""}>
          {text}
        </li>
      </Link>
    )}
  />
);

const TheNavbar = ({ page, onClick }) => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
    <Navbar.Brand href="/#">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/#">Index</Nav.Link>
        <Nav.Link href="/#posts">Posts</Nav.Link>
        <Nav.Link href="/#about">About</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const Nav1 = ({ page, onClick }) => (
  <nav className="nav">
    <header><h1>BlOG</h1></header>
    <Item to='/' exact={true} text='首頁' />
    <Item to='/posts' text='文章列表' />
    <Item to='/about' text='關於我' />
  </nav>
);


export default TheNavbar;
