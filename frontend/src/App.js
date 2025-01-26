import React, { useState } from "react";
import Profile from "./components/Profile";
import Dashboard from "./pages/Dashboard";
import LightNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./components/Landing";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();
  const [currentView, setCurrentView] = useState("dashboard");

  const renderContent = () => {
    if (error) return <p>Authentication Error</p>;
    if (isLoading) return <LoadingSpinner />;
    if (!isAuthenticated) return <Landing />;

    switch (currentView) {
      case "profile":
        return <Profile />;
      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <LightNavbar
        onProfileClick={() => setCurrentView("profile")}
        onDashboardClick={() => setCurrentView("dashboard")}
      />
      {renderContent()}
    </>
  );
}

export default App;
