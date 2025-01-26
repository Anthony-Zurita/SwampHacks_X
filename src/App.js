import { Container, Row, Col, Card } from "react-bootstrap";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import LightNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./components/Landing";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { isLoading, error } = useAuth0();

  return (
    <>
      <LightNavbar />
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <LoadingSpinner />}
      {!error && !isLoading && (
        <>
          <Landing />
          <Container className="mt-4">
            <Row className="justify-content-center">
              <Col md={8} lg={6}>
                <Card className="text-center shadow">
                  <Card.Body>
                    <div className="d-grid gap-2">
                      <Profile />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default App;
