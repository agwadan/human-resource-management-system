import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>
            Register Staff
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/retrieve" style={styles.navLink}>
            Retrieve Staff
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/update" style={styles.navLink}>
            Update Staff
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/register-admin" style={styles.navLink}>
            Register Admin
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/login-admin" style={styles.navLink}>
            Admin Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#282c34",
    padding: "10px",
  },
  navList: {
    listStyleType: "none",
    display: "flex",
    justifyContent: "space-around",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: "0 15px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
};

export default Navbar;
