import React from "react";
import { useRouteMatch, Redirect } from "react-router-dom";
import Dashboard from "../../Layouts/Dashboard/Dashboard";
import MainContent from "./MainContent";
import { useSelector } from "react-redux";
//Pages
import Language from "../Language/Language";
import StudyLevel from "../StudyLevels/StudyLevel";
import Interest from "../Interests/Interest";
import Client from "../Client/Client";
import Campaign from "../Campaigns/Campaign";

const ManagerDashboard = () => {
  const { url, path } = useRouteMatch();

  //links
  const linksList = [
    {
      to: url + "/campaigns",
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
      path: path + "/campaigns",
      page: Campaign,
    },
    {
      path: path + "/studylevels",
      page: StudyLevel,
    },
    {
      path: path + "/languages",
      page: Language,
    },
    {
      path: path + "/clients",
      page: Client,
    },
    {
      path: path + "/interests",
      page: Interest,
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
