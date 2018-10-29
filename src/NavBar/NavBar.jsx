import React from "react";
import { Link } from "react-router-dom";

// Stateless Functional Component
const NavBar = () => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <p className="navbar-brand">CS-ADMIN</p>
        </div>
        <ul className="nav navbar-nav navigation">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/wallet_lines">Wallet Lines</Link>
          </li>
          <li>
            <Link to="/schedule">Schedule</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right navigation">
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
