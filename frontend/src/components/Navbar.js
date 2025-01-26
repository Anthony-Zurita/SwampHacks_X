import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function LightNavbar({ onProfileClick, onDashboardClick }) {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home" onClick={onDashboardClick}>
          Visual Voice
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home" onClick={onDashboardClick}>
            Home
          </Nav.Link>
        </Nav>
        <Nav className="align-items-center">
          {!isAuthenticated ? (
            <LoginButton />
          ) : (
            <>
              <LogoutButton />
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  marginLeft: "15px",
                }}
                onClick={onProfileClick}
              />
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default LightNavbar;
