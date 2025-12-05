import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../../styles/NavBar.css';

const NavBar = () => (
  <Navbar bg="white" variant="white" expand="lg" className="navbar-large">
    <Container className="justify-content-between ms-0">
      <div className = "brand-background">
        <Navbar.Brand href="/" className="navbar-brand-font">DT FusionZ</Navbar.Brand>
        <Navbar.Brand href="/" className="navbar-brand-font" style={{fontSize: '1.2rem'}}>ebi fine food</Navbar.Brand>
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link className="ps-5" href="/">Home</Nav.Link>
          <Nav.Link className="ps-5" href="/menu">Menu</Nav.Link>
          <Nav.Link className="ps-5"href="/contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
