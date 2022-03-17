import React from "react";
import {
  NavLink
} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="main-header navbar navbar-orange navbar-dark navbar-expand border-bottom-0">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="menu" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/manager/dashboard" className="nav-link">
            Dashboard Administrateur
          </NavLink>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">

      </ul>
    </nav>
  );
};

export default Navbar;
