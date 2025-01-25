import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
// import { useAuth0 } from '@auth0/auth0-react';

function LightNavbar() {
    // const { isAuthenticated } = useAuth0();


  return (
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Visual Voice</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Learn</Nav.Link>
            <Nav.Link href="#pricing">Tutors</Nav.Link>
          </Nav>
          <Nav>
            <LoginButton />
            <LogoutButton />
          </Nav>
        </Container>
      </Navbar>
  );
}

export default LightNavbar;