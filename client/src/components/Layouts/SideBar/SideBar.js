import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

const SideBar = () => {
  let { url } = useRouteMatch();
  console.log("side bar url :", url);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <NavLink to="/manager/dashboard" className="brand-link text-center">
        <span className="brand-text font-weight-light">
          {" "}
          Site <b>Influenceur</b> V2
        </span>
      </NavLink>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
          >
            {/* Add icons to the links using the .nav-icon class
       with font-awesome or any other icon font library */}
            <li className="nav-item menu-open">
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink
                    exact={true}
                    to={`${url}/page1`}
                    activeClassName="active"
                    className="nav-link"
                  >
                    <i className="far fa-circle nav-icon" />
                    <p>Page 1</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact={true}
                    to={`${url}/page2`}
                    activeClassName="active"
                    className="nav-link"
                  >
                    <i className="far fa-circle nav-icon" />
                    <p>Page 2</p>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default SideBar;
