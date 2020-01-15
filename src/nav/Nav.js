import React from 'react';
import './Nav.css';
import { Link, Route } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';


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
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#posts">Posts</Nav.Link>
        <Nav.Link href="#about">About</Nav.Link>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link href="#deets">More deets</Nav.Link>
        <Nav.Link eventKey={2} href="#memes">
          Dank memes
      </Nav.Link>
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
