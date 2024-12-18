//import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importing CSS for the navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">MyApp</Link>
        </div>
        <div className="navbar-toggle" id="mobile-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/home" className="navbar-links">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-links">
              My collection
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
