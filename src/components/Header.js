import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">My Finance Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-button">Home</Nav.Link>
            <Nav.Link as={Link} to="/budgeting" className="nav-button">Budgeting</Nav.Link>
            <Nav.Link as={Link} to="/tax-calculator" className="nav-button">Tax Calculators</Nav.Link>
            <Nav.Link as={Link} to="/financial-goals" className="nav-button">Financial Goals</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
