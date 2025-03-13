import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Expense Manager</h1>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;