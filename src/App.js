import Profile from "./components/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./components/Landing";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "./components/LoadingSpinner";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LightNavbar from "./components/Navbar";
import Learn from "./components/Learn";

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return <p>Authentication Error</p>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <LightNavbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={ isAuthenticated ? <Profile /> : <Navigate to="/" />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/online-tutors" element={<div>Tutors Page Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
