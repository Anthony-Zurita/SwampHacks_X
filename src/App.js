import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import LightNavbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <main className="column">
      <LightNavbar />
      <h1>Auth0 Login</h1>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </main>
  );
}

export default App;