import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import authActions from "../../../redux/actions/auth.actions";


const SideBar = ({ links }) => {
  let { url } = useRouteMatch();


  const dispatch = useDispatch();

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
                {links.map((link, i) => {
                  return link.title === "Se déconnecter" ? (
                    <li className="nav-item" key={i}>
                      <a

                        href={link.to}
                        className="nav-link"
                        onClick={(event) => {
                          dispatch(authActions.logout());
                        }}
                      >
                        <i className={link.iconClassName}></i>
                        <p>{link.title}</p>
                      </a>
                    </li>
                  ) :
                    (
                      <li className="nav-item" key={i}>
                        <NavLink
                          exact={true}
                          to={link.to}
                          activeClassName="active"
                          className="nav-link"
                        >
                          <i className={link.iconClassName}></i>
                          <p>{link.title}</p>
                        </NavLink>
                      </li>
                    )
                })}
              </ul>
            </li>

          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div >
      {/* /.sidebar */}
    </aside >
  );
};

export default SideBar;
