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
  const { isLoading, error, isAuthenticated } = useAuth0();

  return (
    <>
      <LightNavbar />
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <LoadingSpinner />}
      {!error && !isLoading && (
        <>
          {isAuthenticated ? <Profile /> : <Landing />}
        </>
      )}
    </>
  );
}

export default App;
