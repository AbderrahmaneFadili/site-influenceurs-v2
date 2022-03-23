import React from "react";
import { useRouteMatch, Redirect } from "react-router-dom";
import Dashboard from "../../Layouts/Dashboard/Dashboard";
import MainContent from "./MainContent";
import { useSelector } from "react-redux";
//Pages
import Language from "../Language/Language";

const ManagerDashboard = () => {
  const { url, path } = useRouteMatch();

  //links
  const linksList = [
    {
      to: url + "/campagnes",
      title: "Campagnes",
      iconClassName: "fas fa-pager nav-icon",
    },
    {
      to: url + "/studylevels",
      title: "Niveaux d'étude",
      iconClassName: "fas fa-school nav-icon",
    },
    {
      to: url + "/languages",
      title: "Langues",
      iconClassName: "fas fa-language nav-icon",
    },
    {
      to: url + "/clients",
      title: "Clients",
      iconClassName: "fas fa-building nav-icon",
    },
    {
      to: url + "/interests",
      title: "Centres d'intérêt",
      iconClassName: "fas fa-heart nav-icon",
    },
    {
      to: "/",
      title: "Se déconnecter",
      iconClassName: "fas fa-sign-out-alt nav-icon",
    },
  ];

  //pages
  const pages = [
    {
      path: path + "/campagnes",
      page: () => <h1>Campagnes</h1>,
    },
    {
      path: path + "/studylevels",
      page: () => <h1>Niveaux d\'étude</h1>,
    },
    {
      path: path + "/languages",
      page: Language,
    },
    {
      path: path + "/clients",
      page: () => <h1>Clients</h1>,
    },
    {
      path: path + "/interests",
      page: () => <h1>Centres d\'intérêt</h1>,
    },
  ];

  const { manager: currentManager } = useSelector((state) => state.authReducer);

  console.log(currentManager);
  if (!currentManager) {
    return <Redirect to="/" />;
  }

  const currentUserOpetions = {
    to: "/manager/profile",
    user: currentManager,
  };
  return (
    <Dashboard
      curreentUser={currentUserOpetions}
      pages={pages}
      links={linksList}
      dashboardTitle={"Dashboard Administrateur"}
      dashboardPath={path}
      dashboardComponent={MainContent}
    />
  );
};

export default ManagerDashboard;
