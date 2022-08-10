import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";

// import Button from 'react-bootstrap/Button';

function Header() {
  return (
    <div className='header'>
        <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Stock Search</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Search</Nav.Link>
            <Nav.Link as={Link} to="/watchlist">Watchlist</Nav.Link>
            <Nav.Link as={Link} to="/portfolio">Portfolio</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </div>
  )
}

export default Header