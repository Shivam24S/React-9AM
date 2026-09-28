import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
      <Container>
        <Navbar.Brand href="#home">TripVerse</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/trips">
              Trips
            </Nav.Link>
            <Nav.Link as={NavLink} to="/auth">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
