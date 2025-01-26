import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function LightNavbar() {

  const { isAuthenticated } = useAuth0();

  return (
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Visual Voice</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/learn">Learn</Nav.Link>
            <Nav.Link as={Link} to="/tutors">Tutors</Nav.Link>
            { isAuthenticated && (
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-center">
            <LoginButton />
            <LogoutButton />
          </Nav>
        </Container>
      </Navbar>
  );
}

export default LightNavbar;