import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function LightNavbar() {
  return (
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Learn</Nav.Link>
            <Nav.Link href="#pricing">Tutors</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default LightNavbar;