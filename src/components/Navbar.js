import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get current route location
  const navigate = useNavigate(); // For navigation

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    // Add logout logic here (e.g., clear user session)
    console.log("User logged out");
    navigate("/login"); // Redirect to login page
  };

  // Inline styles
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#333",
      color: "#fff",
      padding: "10px 20px",
    },
    navbarBrand: {
      margin: "0",
      fontSize: "24px",
    },
    mobileMenuIcon: {
      display: "none", // Hide by default
      fontSize: "24px",
      cursor: "pointer",
    },
    navbarLinks: {
      display: "flex",
      listStyle: "none",
      margin: "0",
      padding: "0",
    },
    navbarLinkItem: {
      marginLeft: "20px",
    },
    navbarLink: {
      color: "#fff",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      padding: "10px",
      borderRadius: "4px",
      transition: "background-color 0.3s",
    },
    navbarLinkHover: {
      backgroundColor: "#555",
    },
    activeLink: {
      backgroundColor: "#28a745",
    },
    logoutButton: {
      background: "none",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      fontSize: "16px",
      padding: "10px",
      borderRadius: "4px",
      transition: "background-color 0.3s",
    },
    logoutButtonHover: {
      backgroundColor: "#dc3545",
    },
    mobileMenu: {
      display: "none", // Hide by default on mobile
      flexDirection: "column",
      position: "absolute",
      top: "60px",
      right: "20px",
      backgroundColor: "#333",
      borderRadius: "4px",
      padding: "10px",
      width: "200px",
    },
    mobileMenuActive: {
      display: "flex", // Show when mobile menu is open
    },
    mobileLinkItem: {
      margin: "10px 0",
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo and App Name */}
      <div style={styles.navbarBrand}>
        <h1>Expense Manager</h1>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div
        style={styles.mobileMenuIcon}
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Links */}
      <ul
        style={{
          ...styles.navbarLinks,
          ...(isMobileMenuOpen && styles.mobileMenuActive),
        }}
      >
        <li style={isMobileMenuOpen ? styles.mobileLinkItem : styles.navbarLinkItem}>
          <Link
            to="/dashboard"
            style={{
              ...styles.navbarLink,
              ...(location.pathname === "/dashboard" && styles.activeLink),
            }}
          >
            Dashboard
          </Link>
        </li>
        <li style={isMobileMenuOpen ? styles.mobileLinkItem : styles.navbarLinkItem}>
          <Link
            to="/reports"
            style={{
              ...styles.navbarLink,
              ...(location.pathname === "/reports" && styles.activeLink),
            }}
          >
            Reports
          </Link>
        </li>
        <li style={isMobileMenuOpen ? styles.mobileLinkItem : styles.navbarLinkItem}>
          <Link
            to="/profile"
            style={{
              ...styles.navbarLink,
              ...(location.pathname === "/profile" && styles.activeLink),
            }}
          >
            <FaUserCircle /> Profile
          </Link>
        </li>
        <li style={isMobileMenuOpen ? styles.mobileLinkItem : styles.navbarLinkItem}>
          <button
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;