import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import AuthContextProvider, { authContext } from "../../context/AuthContext";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

function NavbarComponent() {
  const { user } = useContext(authContext);

  console.log("user", user);

  const handleLogOut = async () => {
    await signOut(auth);
  };

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
            {!user ? (
              <Nav.Link as={NavLink} to="/auth">
                <Button>Login</Button>
              </Nav.Link>
            ) : (
              <Button onClick={handleLogOut}>Log out </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
