import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Menu</h2>
      <ul style={styles.navList}>
        <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
        <li><Link to="/add-expense" style={styles.link}>Add Expense</Link></li>
        <li><Link to="/expense-list" style={styles.link}>View Expenses</Link></li>
        <li><button onClick={handleLogout} style={styles.logoutButton}>Logout</button></li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: { width: "200px", height: "100vh", background: "#333", color: "white", padding: "20px", position: "fixed" },
  title: { textAlign: "center" },
  navList: { listStyle: "none", padding: 0 },
  link: { color: "white", textDecoration: "none", display: "block", padding: "10px", marginTop: "10px", background: "#444", borderRadius: "5px" },
  logoutButton: { width: "100%", padding: "10px", background: "red", color: "white", border: "none", cursor: "pointer", marginTop: "20px" }
};

export default Sidebar;
