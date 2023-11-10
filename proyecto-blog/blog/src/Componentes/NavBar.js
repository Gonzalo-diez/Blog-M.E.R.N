import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/blogs/Lenguajes">Lenguajes</Nav.Link>
            <Nav.Link as={Link} to="/blogs/Experiencias">Experiencias</Nav.Link>
            <Nav.Link as={Link} to="/blogs/Entrevistas">Entrevistas</Nav.Link>
            <Nav.Link as={Link} to="/blogs/Proyectos">Proyectos</Nav.Link>
            <Nav.Link as={Link} to="/login"><BiUserCircle /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;