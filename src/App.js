import { Container, Row, Col, Card } from "react-bootstrap";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import LightNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./components/Landing";

function App() {
  return (
    <>
      <LightNavbar />
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
  );
}

export default App;
