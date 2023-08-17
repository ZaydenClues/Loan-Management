import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./AdminNavBar.module.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../Context/UserContext";

function AdminNavBar() {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserContext();

  const handleLogout = () => {
    window.sessionStorage.clear(); // Store in session storage
    setUserData({ exists: false, user: null });
    navigate("/login");
  };
  return (
    <Navbar className={styles.navbar}>
      <div className={styles.header}>
        <img alt="img" src="../assets/wells.png" width={50} />
        <Navbar.Brand
          href="/admin/dashboard"
          style={{ color: "white" }}
          className={styles.brand}
        >
          Loan Management Admin Portal
        </Navbar.Brand>
      </div>
      <Nav className="me-auto">
        <Nav.Link href="/admin/dashboard" style={{ color: "white" }}>
          Dashboard
        </Nav.Link>

        <Nav.Link style={{ color: "#FFB500" }} onClick={handleLogout}>
          Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default AdminNavBar;
