import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";

function NavBar() {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserContext();

  const handleLogout = () => {
    window.sessionStorage.clear(); // Store in session storage
    setUserData({ exists: false, user: null });
    navigate("/login");
  };
  return (
    <>
      <Navbar className={styles.navbar}>
        <div className={styles.header}>
          <img src="./assets/wells.png" width={50} />
          <Navbar.Brand
            href="/dashboard"
            style={{ paddingLeft: 50 + "px", color: "white" }}
          >
            Loan Management User Portal
          </Navbar.Brand>
        </div>
        <Nav className="me-auto">
          <Nav.Link href="/dashboard" style={{ color: "white" }}>
            Dashboard
          </Nav.Link>
          <Nav.Link onClick={handleLogout} style={{ color: "#FFB500" }}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default NavBar;
