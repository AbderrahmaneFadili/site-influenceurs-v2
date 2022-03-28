import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ title, curreentUser, navColor }) => {
  return (
    <nav
      className={
        "main-header navbar navbar-" +
        navColor +
        " navbar-dark navbar-expand border-bottom-0"
      }
    >
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="menu"
            role="button"
          >
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/manager/dashboard" className="nav-link">
            {title}
          </NavLink>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        <NavLink to={curreentUser.to} className="nav-link">
          {curreentUser.user.fullName}
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
